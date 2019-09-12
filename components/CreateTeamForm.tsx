import React from "react"
import {Modal, Text, StyleSheet, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { db } from '../utils/firebase';
import { UserContext } from "../context/UserContext";

export class CreateTeamForm extends React.Component<any, any> {
  state = { name: null }

  static contextType = UserContext

  createTeam() {
    const { user } = this.context
    const { name } = this.state
    const { huntId } = this.props

    db.collection('teams')
      .add({
        name: name,
        leader: user.uid,
      })
      .then(team => {
        db.collection('hunts_teams_users')
          .add({
            teamId: team.id,
            huntId: huntId,
            userId: user.uid,
          }).then(doc => {
            // TODO: Navigate to TeamInvite screen
            console.log(doc.data())
          })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { visible, closeModal } = this.props

    return (
      <View>
        <Modal
        animationType="slide"
        transparent={false}
        visible={ visible }
        onRequestClose={ () => closeModal() }>
          <View style={{ flex: 1 }}>
            <View>
              <Input
                inputStyle={styles.textInput}
                placeholderTextColor="white"
                containerStyle={{ marginBottom: 10 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Name'
                onChangeText={ e => this.setState({ name: e }) }
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
              <View style={{ flex: 0.5 }}>
                <Button
                  onPress={() => closeModal() }
                  title="Not Yet"
                />
              </View>
              <View style={{ flex: 0.5 }}>
                <Button
                  onPress={() => this.createTeam() }
                  title="Create"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textInput: {
    color: 'blue',
    borderColor: 'blue',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20
  }
});
