import React from 'react';
import { Text, View } from 'react-native';

export class ActiveHuntScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Hunt!</Text>
      </View>
    );
  }
}
