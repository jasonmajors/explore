import React from "react";
import {
    ActivityIndicator,
    View,
    SafeAreaView,
    StyleSheet,
  } from 'react-native';

import { auth } from '../utils/firebase';
import { UserContext } from "../context/UserContext";

export class AuthLoadingScreen extends React.Component<any, any> {
  static contextType = UserContext

  componentDidMount() {
    auth.handleAuthState(this.props.navigation, this.context)
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
