import React from 'react';
import { Text, View, Button } from 'react-native';
import { db, firebase } from '../utils/firebase';
import { AsyncStorage } from 'react-native';
import { UserContext } from '../context/UserContext';

export class ModalScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  static contextType = UserContext

  state = {
    teamId: null
  }
  // TODO: Need to check if user already in an active team, and kick them back to the listings page if they end up here
  // content:
  // distance
  // completion time
  // players (?)
  // terrain?

  // on activation - need to create a "team" or "active hunt"
  // need a mechanism for inviting others to the team / active hunt
  // requirements: code (uuid? not guessable), approval by starter?

  createTeam() {
    const user = this.context.user
    const huntId = this.props.navigation.getParam('huntId', 'INVALID')

    db.collection('teams')
      .add({
        leader: user.uid,
        active: true,
        hunt: huntId
      })
      .then(doc => {
        this.storeTeamId(doc.id, user)
          .then(() => this.props.navigation.navigate("TeamSetup"))
      })
      .catch(error => console.log(error))
  }

  storeTeamId = async (teamId, user) => {
    return db.collection('users')
      .doc(user.uid)
      .update({ teamId })
      .then(async () => {
        try {
          await AsyncStorage.setItem('activeTeam', teamId)
          // Should also set in Context? Maybe only in context
        } catch (error) {
          console.log(error)
        }
      })
  }
  // TODO: This should be on login
  getTeamId = async () => {
    try {
      // Maybe only query from firebawse
      const teamId = await AsyncStorage.getItem('activeTeam');
      if (teamId !== null) {
        // We have data!!
        // Should set it in Context
        this.setState({ teamId })
      } else {
        // query firebase for teamId and set in context
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  getTeamIdFromDb = async () => {
    return db.collection('users').doc()

  }

  render() {
    const { user } = this.context
    console.log(user)
    return (
      <View style={{ flex: 1, backgroundColor: 'teal' }}>
        <View style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'flex-end', marginLeft: 20, marginRight: 20 }}>
          <Text style={{ fontSize: 40, color: 'white' }}>Naples</Text>
          <Text style={{ fontSize: 20, color: 'white' }}>herp derp content content its fun with your friends.. more content omg what happens if we keep going</Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Distance: 3 miles</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>Players: 2 - 4</Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: 'white' }}>some content here?</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Not Yet"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => this.createTeam()}
              title="Get Started"
            />
          </View>
        </View>
      </View>
    );
  }
}
