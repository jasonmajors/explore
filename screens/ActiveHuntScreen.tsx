import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { db } from '../services/firebase';
import { DocumentReference } from '@firebase/firestore-types'
import { Button } from 'react-native-elements';
import SubmitLocation from '../components/SubmitLocation';

export class ActiveHuntScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      hint: '',
      node: { content: '' },
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
    // Subscribe to the current hunt to set node
    activeHunt.onSnapshot(currentHunt => {
      const { currentNode, currentHint, huntId } = currentHunt.data()
      db.collection('hunts').doc(huntId)
        .get()
        .then(hunt => {
          if (hunt.exists) {
            const { title, nodes } = hunt.data()
            // Could be its own func
            Object.keys(nodes).forEach(key => {
              if (nodes[key].position === currentNode) {
                // Set the current hunt node
                this.setState({ node: nodes[key] })
                nodes[key].hints.forEach(hint => {
                  if (hint.position === currentHint) {
                    // load the current hint the user can look at
                    this.setState({ hint: hint.value })
                  }
                })
              }
            })

            this.setState({ title })
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
    const { title, node, hint } = this.state
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{ title }</Text>
        <Text>{ node.content }</Text>
        {/* TODO: Track hint usage */}
        <Button
          title="Hint!"
          onPress={ () => Alert.alert('Ok...', hint) }
        />
        <SubmitLocation node={ node } />
      </View>
    );
  }
}
