import React from 'react';
import { Text, View, Button } from 'react-native';
import { BeginHuntCTA } from '../components/BeginHuntCTA';

export class HuntDetailsScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  render() {
    const huntId = this.props.navigation.getParam('huntId', 'INVALID')
    const huntTitle = this.props.navigation.getParam('huntTitle', 'INVALID')
    // TODO: Figure out what we want on details and pull it from the DB
    return (
      <View style={{ flex: 1, backgroundColor: 'teal' }}>
        <View style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'flex-end', marginLeft: 20, marginRight: 20 }}>
          <Text style={{ fontSize: 40, color: 'white' }}>{ huntTitle }</Text>
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
              onPress={() => this.props.navigation.replace("TeamSetup", { huntId, huntTitle })}
              title="Setup Team"
            />
          </View>
          {/* <View style={{ flex: 1 }}>
            <BeginHuntCTA
              huntId={ huntId }
            />
          </View> */}
        </View>
      </View>
    );
  }
}
