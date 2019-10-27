import React from 'react';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { db } from '../services/firebase';
import { DocumentReference } from '@firebase/firestore-types'

export class ActiveHuntScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      currentNode: null,
    }
  }

  static navigationOptions = {
    header: null
  }

  static contextType: React.Context<any> = UserContext

  componentDidMount(): void {
    console.log('we have a hunt', this.context)
    this.setCurrentHuntStatus()
  }

  async setCurrentHuntStatus(): Promise<void> {
    const { activeHuntPivotId } = this.context

    const activeHunt: DocumentReference = await this.fetchActiveHunt(activeHuntPivotId)

    activeHunt.onSnapshot(currentHunt => {
      const { currentNode, huntId } = currentHunt.data()
      db.collection('hunts').doc(huntId)
        .get()
        .then(hunt => {
          if (hunt.exists) {
            const { title } = hunt.data()

            this.setState({ title })
            this.setState({ currentNode })
            console.log('currently on step: ', currentNode)
          } else {
            // no hunt? redirect back to App I guess...
          }
        })
    }, error => console.log(error))
  }

  async fetchActiveHunt(activeHuntPivotId): Promise<firebase.firestore.DocumentReference> {
    return await db.collection('hunts_teams_users').doc(activeHuntPivotId)
  }

  render() {
    const { title, currentNode } = this.state
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{ title }</Text>
        <Text>{ currentNode }</Text>
      </View>
    );
  }
}
