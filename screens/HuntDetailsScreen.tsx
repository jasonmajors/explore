import React from 'react';
import { Text, View, Button } from 'react-native';
import { db } from '../utils/firebase';

export class HuntDetailsScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  // createTeam() {
  //   const user = this.context.user

  //   db.collection('teams')
  //     .add({
  //       leader: user.uid,
  //       hunt: huntId,
  //     })
  //     .then(doc => {
  //       this.storeTeamId(doc.id, user)
  //         .then(() => this.props.navigation.navigate("Hunt"))
  //     })
  //     .catch(error => console.log(error))
  // }

  // storeTeamId = async (teamId, user) => {
  //   return db.collection('users')
  //     .doc(user.uid)
  //     .update({ teamId })
  //     .then(() => {
  //       this.context.setTeamId(teamId)
  //     })
  //     .catch(err => console.log(err))
  // }


  render() {
    const huntId = this.props.navigation.getParam('huntId', 'INVALID')
    // TODO: Figure out what we want on details and pull it from the DB
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
              onPress={() => this.props.navigation.navigate("TeamSetup", { huntId })}
              title="Setup Team"
            />
          </View>
        </View>
      </View>
    );
  }
}
