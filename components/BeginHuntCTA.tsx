import React from "react"
import { UserContext } from "../context/UserContext";
import { Button } from "react-native";
import { db } from '../services/firebase';

export class BeginHuntCTA extends React.Component<any, any> {
  static contextType = UserContext

  startHunt(huntId: string, teamId: string): void {
    const { user } = this.context
    // TODO: Use current implementation of startHunt in CreateTeamForm.tsx
    // db.collection('hunts_teams_users')
    //   .where('userId', '==', user.uid)
    //   .where('teamId', '==', teamId)
    //   .where('huntId', '==', huntId)
    //   .where('startedAt', '==', null)
    //   .update({
    //     startedAt: firebase.firestore.FieldValue.serverTimestamp()
    //   }).then(() => {
    //     console.log('Updated')
    //     // Should update context to contain huntId and teamId probably...
    //     this.props.navigation.replace("Hunt", { huntId })
    //   })
  }

  render() {
    const { huntId, teamId } = this.props
    const { user } = this.context

    return (
      <Button
        onPress={ () => this.startHunt(huntId, teamId) }
        title="Begin!"
      />
    )
  }
}
