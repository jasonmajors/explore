import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { db } from '../services/firebase';
import { DocumentReference } from '@firebase/firestore-types'
import { Button } from 'react-native-elements';
import SubmitLocation from '../components/SubmitLocation';
import { fetchActiveHunt, setHuntFinished } from '../queries';

export class ActiveHuntScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
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

  setCurrentNode(currentNode: number, currentHint: number, nodes) {
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
  }

  async setCurrentHuntStatus(): Promise<void> {
    const { activeHuntPivotId } = this.context

    const activeHunt: DocumentReference = await fetchActiveHunt(activeHuntPivotId)
    // Subscribe to the current hunt to set node
    activeHunt.onSnapshot(currentHunt => {
      const { currentNode, currentHint, huntId, finishedAt } = currentHunt.data()
      db.collection('hunts').doc(huntId)
      .get()
      .then(hunt => {
        if (hunt.exists) {
          const { title, nodes } = hunt.data()
          // User has completed the hunt
          if (currentNode === Object.keys(nodes).length) {
            setHuntFinished(activeHunt)
            // TODO: Will need to save their 'reward' somewhere here as well
            // and setup a "your rewards" screen
            this.props.navigation.replace('Completed', {})
          } else {
            // Could be its own func
            this.setCurrentNode(currentNode, currentHint, nodes)
            this.setState({ title })
            this.setState({ loaded: true })
            console.log('currently on step: ', currentNode)
          }
        } else {
          // no hunt? redirect back to App I guess...
          console.error("Somehow ended up on the active hunt screen without an active hunt")
          this.props.navigation.replace('Home')
        }
      })
    }, error => console.log(error))
  }

  render() {
    const { title, node, hint, loaded } = this.state
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        { loaded && (
          <View>
            <Text>{ title }</Text>
            <Text>{ node.content }</Text>
            {/* TODO: Track hint usage */}
            <Button
              title="Hint!"
              onPress={ () => Alert.alert('Ok...', hint) }
            />
            <SubmitLocation node={ node } />
          </View>
        )}
      </View>
    );
  }
}
