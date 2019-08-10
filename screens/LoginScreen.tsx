import React from "react";
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, StatusBar, TouchableHighlight } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input, Button } from 'react-native-elements';


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    login: true,
    name: null,
    email: null,
    password: null,
  }

  render() {
    const { login } = this.state
    const btnText = login ? "Login" : "Sign Up"

    return (
      <SafeAreaView>
        <ImageBackground
          source={{ uri: 'https://enacademic.com/pictures/enwiki/76/Long_beach3.jpg' }}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <View style={{ flex: 1.75, alignItems: 'center', justifyContent: 'flex-end'}}>
              <Text style={ styles.baseText }>Long Beach</Text>
              <Text style={ styles.titleText }>Explore</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center'}}>
              { !login && (
                <Input
                  inputStyle={styles.textInput}
                  placeholderTextColor="white"
                  containerStyle={{ marginBottom: 10 }}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  placeholder='Name'
                />
              )}
              <Input
                inputStyle={styles.textInput}
                placeholderTextColor="white"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Email'
              />
              <Input
                inputStyle={styles.textInput}
                placeholderTextColor="white"
                containerStyle={{ marginTop: 10 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Password'
              />
              <Button
                containerStyle={ styles.loginButtonContainer }
                buttonStyle={ styles.loginButton }
                title={ btnText }
                />
              { login && (
                <TouchableHighlight onPress={ () => this.setState({ login: false }) }>
                  <View style={{ flex: 1 }}>
                    <Text style={ styles.onboardingText }>
                      <Text>Need an account?</Text>
                      <Text style={ styles.onboardingTextLink }> Sign Up</Text>
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              { !login && (
                <TouchableHighlight onPress={ () => this.setState({ login: true }) }>
                  <View style={{ flex: 1 }}>
                    <Text style={ styles.onboardingText }>
                      <Text>Already have an account?</Text>
                      <Text style={ styles.onboardingTextLink }> Login</Text>
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1
  },
  textInput: {
    color: 'white',
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  loginButtonContainer: {
    height: 50,
    marginTop: 10,
    width: '100%'
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 8,

    height: 50,
    marginLeft: 10,
    marginRight: 10
  },
  onboardingText: {
    fontSize: 17,
    marginTop: 10,
    color: 'white'
  },
  onboardingTextLink: {
    fontWeight: 'bold',
    color: 'blue'
  },
  baseText: {
    // fontFamily: 'Cochin',
    color: 'white',
    fontSize: 20
  },
  titleText: {
    // fontFamily: 'Cochin',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: LoginScreen
  }
});

export default createAppContainer(AppNavigator);
