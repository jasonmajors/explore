
import React from 'react';
import { Text, View, Button } from 'react-native';
import { firebase } from '../utils/firebase';
import { UserContext } from '../context/UserContext';

export class HomeScreen extends React.Component<any, any> {
  static contextType = UserContext

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      )
    }
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Auth')
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
  }

  render() {
    const { user } = this.context
    console.log(user)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Sign Out"
          onPress={ () => this.signOut() }
        />
      </View>
    );
  }
}
