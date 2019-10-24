import React from "react"
import {Modal, StyleSheet, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { db, firebase } from '../utils/firebase';
import { UserContext } from "../context/UserContext";

export class CreateTeamForm extends React.Component<any, any> {
  state = { name: null }

  static contextType = UserContext

  createTeam(): void {
    const { user } = this.context
    const { name } = this.state
    const { huntId, closeModal } = this.props

    db.collection('teams')
      .add({
        name: name,
        // TODO: Don't know if we really need this leader mechanic for awhile
        leader: user.uid,
      })
      .then(team => {
        db.collection('hunts_teams_users')
          .add({
            teamId: team.id,
            huntId: huntId,
            userId: user.uid,
            startedAt: null,
            finishedAt: null,
            cancelledAt: null
          }).then(doc => {
            // closeModal()
            console.log('starting hunt...')
            // console.log(doc.data())
            // TODO: THIS IS TEMP - Ideally, we just close the modal and continue to team invites and shit
            this.startHunt(huntId, team.id)
          })
      })
      .catch(error => console.log(error))
  }
  // TEMPORARY HACK UNTIL WE FLESH OUT TEAM INVITES
  // Method belongs in BeginHuntCTA
  startHunt(huntId: string, teamId: string): void {
    db.collection('hunts_teams_users')
      .where('userId', '==', this.context.user.uid)
      .where('teamId', '==', teamId)
      .where('huntId', '==', huntId)
      .where('startedAt', '==', null)
      .limit(1)
      .get()
      .then(querySnapshot => {
        // Should only be one...
        querySnapshot.forEach(doc => {
          db.collection('hunts_teams_users').doc(doc.id).update({
            startedAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        })
      }).then(() => {
        console.log('Updated')
        this.context.setTeamId(teamId)
        this.context.setHuntId(huntId)
        this.props.navigation.replace("Hunt")
      }).catch(error => console.log(error))
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
