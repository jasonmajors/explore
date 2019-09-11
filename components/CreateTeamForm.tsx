import React from "react"
import {Modal, Text, StyleSheet, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { db } from '../utils/firebase';

export class CreateTeamForm extends React.Component<any, any> {
  createTeam() {
    const user = this.context.user

    db.collection('teams')
      .add({
        leader: user.uid,
        hunt: this.props.huntId,
      })
      .then(doc => {
        // this.storeTeamId(doc.id, user)
        //   .then(() => this.props.navigation.navigate("Hunt"))
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
                  onPress={() => this.setState({ modalVisible: true })}
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
    color: 'white',
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20
  }
});
