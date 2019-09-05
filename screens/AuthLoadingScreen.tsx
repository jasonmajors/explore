import React from "react";
import {
    ActivityIndicator,
    View,
    SafeAreaView,
    StyleSheet,
  } from 'react-native';

import { firebase, listenForAuth } from '../utils/firebase';
import { UserContext } from "../context/UserContext";

export class AuthLoadingScreen extends React.Component<any, any> {
  static contextType = UserContext

  componentDidMount() {
    listenForAuth(firebase, this.props, this.context)
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
