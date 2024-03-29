import React from "react";
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, TouchableHighlight } from "react-native";
import { Input, Button, SocialIcon } from 'react-native-elements';
import Auth from '../utils/Auth';
import { UserContext } from "../context/UserContext";

export class LoginScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
      name: null,
      email: null,
      password: null,
      error: null,
    }
  }

  static navigationOptions = {
    header: null,
  }

  static contextType = UserContext

  componentDidMount() {
    Auth.handleAuthState(this.props.navigation, this.context)
  }

  async register(): Promise<void> {
    if (this.state.email && this.state.password) {
      const { email, password } = this.state;
      const error: string = await Auth.register(email, password)
      if (error) {
        this.setError(error)
      }
    } else {
      // error - required fields
    }
  }

  async login(): Promise<void> {
    if (this.state.email && this.state.password) {
      const { email, password } = this.state;
      const error = await Auth.login(email, password)
      if (error) {
        this.setError(error)
      }
    } else {
      // error - required fields
    }
  }

  setError(errorMessage: string): void {
    this.setState({ error: errorMessage })
  }

  render() {
    const { login, error } = this.state
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
            <View style={{ flex: 1.75, alignItems: 'center' }}>
              { error && (
                <Text style={{ color: '#ff9999' }}>{ error }</Text>
              )}
              { !login && (
                <Input
                  inputStyle={styles.textInput}
                  placeholderTextColor="white"
                  containerStyle={{ marginBottom: 10 }}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  placeholder='Name'
                  onChangeText={ e => this.setState({ name: e }) }
                />
              )}
              <Input
                inputStyle={styles.textInput}
                placeholderTextColor="white"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Email'
                onChangeText={ email => this.setState({ email }) }
              />
              <Input
                inputStyle={styles.textInput}
                placeholderTextColor="white"
                containerStyle={{ marginTop: 10 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={ password => this.setState({ password }) }
              />
              <Button
                containerStyle={ styles.loginButtonContainer }
                buttonStyle={ styles.loginButton }
                title={ btnText }
                onPress={ login ? () => this.login() : () => this.register() }
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
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>Or With</Text>
              </View>
              <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-around' }}>
                <SocialIcon
                  type='facebook'
                  style={{ backgroundColor: 'transparent' }}
                  raised={false}
                  iconSize={35}
                />
                <SocialIcon
                  type='twitter'
                  style={{ backgroundColor: 'transparent' }}
                  raised={false}
                  iconSize={35}
                />
                <SocialIcon
                  type='google'
                  style={{ backgroundColor: 'transparent' }}
                  raised={false}
                  iconSize={35}
                />
              </View>
            </View>
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
