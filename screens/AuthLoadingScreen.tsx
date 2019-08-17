import React from "react";
import {
    ActivityIndicator,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
  } from 'react-native';

import { firebase, listenForAuth } from '../utils/firebase';

export class AuthLoadingScreen extends React.Component<any, any> {
  constructor(props) {
    super(props)
    listenForAuth(firebase, props)
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
