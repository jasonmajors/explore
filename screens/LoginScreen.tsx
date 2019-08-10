import React from "react";
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input } from 'react-native-elements';


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <SafeAreaView>
        <ImageBackground
          source={{ uri: 'https://enacademic.com/pictures/enwiki/76/Long_beach3.jpg'}}
          style={{width: '100%', height: '100%'}}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1.75, alignItems: 'center', justifyContent: 'flex-end'}}>
              <Text style={ styles.baseText }>Long Beach</Text>
              <Text style={ styles.titleText }>Explore</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center'}}>
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
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  baseText: {
    // fontFamily: 'Cochin',
    color: 'white',
    fontSize: 20
  },
  titleText: {
    // fontFamily: 'Cochin',
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
