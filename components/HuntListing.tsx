import React from "react";
import { Text, ImageBackground, View, StyleSheet, Dimensions } from "react-native";
import { Button } from 'react-native-elements';
import Strings from '../utils/strings';
import { Ionicons } from '@expo/vector-icons';

export class HuntListing extends React.Component<any, any> {
    render() {
      const { image, title, description, nextHunt } = this.props
      const { height } = Dimensions.get('window')

      return (
        <View style={{ backgroundColor: 'blue', height: height - 60 }}>
          <ImageBackground
            source={{ uri: image }}
            style={ styles.imageStyle }
          >
          </ImageBackground>
          <View style={ styles.overlay } />
            <View style={ styles.content }>
              <Text style={{ fontSize: 60, color: 'white' }}>{ title }</Text>
              <Text style={{ fontSize: 17, color: 'white' }}>{ description }</Text>
              <Button
                containerStyle={ styles.buttonContainer }
                buttonStyle={ styles.button }
                title={ Strings.huntIndexCTA }
                onPress={ () => alert('CTA!') }
              />
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', ...StyleSheet.absoluteFillObject }} >
                <Ionicons
                  style={{ marginBottom: 40 }}
                  name="md-arrow-dropdown-circle"
                  size={55}
                  color="white"
                  onPress={ nextHunt }
                />
              </View>
            </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  imageStyle: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    height: 50,
    marginTop: 40,
    width: '50%'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    height: 50,
    marginLeft: 10,
    marginRight: 10
  },
})
