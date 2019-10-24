import React from 'react';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';

export class ActiveHuntScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextType = UserContext

  componentDidMount() {
    console.log('we have a hunt', this.context)
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Hunt!</Text>
      </View>
    );
  }
}
