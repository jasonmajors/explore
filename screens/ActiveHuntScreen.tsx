import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { db } from '../services/firebase';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types'
import { Button } from 'react-native-elements';
import SubmitLocation from '../components/SubmitLocation';
import { fetchActiveHunt, setHuntFinished, incrementHint } from '../queries';

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

  /**
   * Subscribes to changes in our current active hunt in order to set the state
   */
  async setCurrentHuntStatus(): Promise<void> {
    const { activeHuntPivotId } = this.context
    const activeHunt: DocumentReference = await fetchActiveHunt(activeHuntPivotId)
    // Subscribe to the current hunt to set node
    activeHunt.onSnapshot(currentHunt => {
      const { currentNode, currentHint, huntId } = currentHunt.data()
      db.collection('hunts').doc(huntId)
        .get()
        .then(hunt => {
          if (hunt.exists) {
            this.setupHuntState(hunt, currentNode, currentHint)
          } else {
            console.error("Somehow ended up on the active hunt screen without an active hunt")
            this.props.navigation.replace('Home')
          }
        })
    }, error => console.log(error))
  }

  /**
   * Sets up our current hunt state
   *
   * @param hunt
   * @param currentNode
   * @param currentHint
   */
  setupHuntState(hunt: DocumentSnapshot, currentNode: number, currentHint: number): void {
    const { title, nodes } = hunt.data()
    // User has completed the hunt
    if (currentNode === Object.keys(nodes).length) {
      setHuntFinished(hunt.ref)
      // TODO: Will need to save their 'reward' somewhere here as well and setup a "your rewards" screen
      this.props.navigation.replace('Completed', {})
    } else {
      this.setCurrentNode(currentNode, currentHint, nodes)
      this.setState({ title, loaded: true })
      console.log('currently on step: ', currentNode)
    }
  }

  /**
   * Set the node we're currently at
   *
   * @param currentNode
   * @param currentHint
   * @param nodes
   */
  setCurrentNode(currentNode: number, currentHint: number, nodes): void {
    Object.keys(nodes).forEach(key => {
      if (nodes[key].position === currentNode) {
        // Set the current hunt node
        const node = nodes[key]
        this.setState({ node })
        if (currentHint === node.hints.length) {
          // Resets back to first hint
          incrementHint(this.context.activeHuntPivotId, true).then(() => {
            this.setCurrentHint(node, currentHint);
          })
        } else {
          this.setCurrentHint(node, currentHint);
        }
      }
    })
  }

  /**
   * Set the current hint
   *
   * @param node
   * @param currentHint
   */
  setCurrentHint(node, currentHint: number): void {
    node.hints.forEach(hint => {
      if (hint.position === currentHint) {
        // load the current hint the user can look at
        this.setState({ hint: hint.value })
      }
    })
  }

  /**
   * Display the current hint and increment which hint we're on
   */
  fetchAndIncrementHint(): void {
    const { hint } = this.state
    const { activeHuntPivotId } = this.context
    // Displays the hint
    Alert.alert(hint)
    // Increment which hint we're on
    incrementHint(activeHuntPivotId)
  }

  render() {
    const { title, node, loaded } = this.state
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        { loaded && (
          <View>
            <Text>{ title }</Text>
            <Text>{ node.content }</Text>
            <Button
              title="Hint!"
              onPress={ () => this.fetchAndIncrementHint() }
            />
            <SubmitLocation node={ node } />
          </ View>
        )}
      </View>
    );
  }
}
