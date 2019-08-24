import React from "react";
import { Text, ImageBackground, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

export class HuntListing extends React.Component<any, any> {
    render() {
      const { image, title, description } = this.props
      return (
        <ImageBackground
          source={{ uri: image }}
          style={{width: '100%', height: '100%'}}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 60, color: 'white' }}>{ title }</Text>
            <Text style={{ fontSize: 20, color: 'white' }}>{ description }</Text>
            <Button
              containerStyle={ styles.buttonContainer }
              buttonStyle={ styles.button }
              title="Get Started"
            />
          </View>
        </ImageBackground>
      )
    }
}


const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    marginTop: 10,
    width: '80%'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,

    height: 50,
    marginLeft: 10,
    marginRight: 10
  },
})
