import React from "react";
import {
    ActivityIndicator,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
  } from 'react-native';

import firebase from '../utils/firebase';

export class AuthLoadingScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.bootstrap();
  }

  bootstrap() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!")
        // Send user to main stack
        this.props.navigation.navigate('App')
      } else {
        console.log("User needs to sign in")
        this.props.navigation.navigate('Auth')
      }
    });
  }
  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView>
        <View style={ styles.container }>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
