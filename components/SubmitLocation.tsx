import React, { useState, useEffect, useContext } from "react"
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button } from "react-native-elements";
import { Platform, View, Modal, Text, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { getDistance } from "geolib";
import { Accuracy } from "expo-location";
import { UserContext } from "../context/UserContext";
import { incrementHuntNode } from "../queries";

type SubmitLocationProps = {
  node: any
}

function SubmitLocation(props: SubmitLocationProps) {
  const [response, setResponse] = useState('')
  const [visible, setContentVisible] = useState(false)

  const context = useContext(UserContext)

  // TODO: This is dumb here, but whatever - only need it for dev
  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
    } else {
      console.log('here we go')
    }
  })

  const checkLocation = async (): Promise<void> => {
    // TODO: We need to ask for permissions somewhere still. Maybe when you start the hunt?
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
    }
    setResponse('')
    setContentVisible(true)
    // TODO: Some loading animation
    const location: Location.LocationData = await Location.getCurrentPositionAsync({
      accuracy: Accuracy.Highest,
      enableHighAccuracy: true
    })
    const distance = getDistanceFromCurrentLocation(location)
    // TODO: end some loading animation
    const proximity: number = Constants.manifest.extra.proximity
    let response: string
    if (distance <= proximity) {
      response = "You did it!"
      updateCurrentNode()
      // TODO: Need to check if it's the last node somehow and be like "You won"
    } else {
      response = `Not quite! ${distance} meters away`
    }
    setResponse(response)
    // TODO: Save the location for auditing and metrics
  }

  const updateCurrentNode = async (): Promise<void> => {
    // Get our current hunt and increment the currentNode
    incrementHuntNode(context.activeHuntPivotId)
  }

  const getDistanceFromCurrentLocation = (location: Location.LocationData): number => {
    const { node } = props

    return getDistance(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      { latitude: node.location.latitude, longitude: node.location.longitude }
    )
  }
  // On success... i think we can just nav to a modal that says yay you did it?
  // then when they close the modal the user will still be on ActiveHuntScreen on the next node
  return (
    <View>
      <Button
        title="I'm there!"
        onPress={ () => checkLocation() }
      />
      <Modal
        animationType="slide"
        transparent={ false }
        visible={ visible }
        onRequestClose={ () => setContentVisible(false) }
      >
        <View style={ styles.container }>
          <Text style={ styles.paragraph }>{ response }</Text>
          <Button
            title="ok cool"
            onPress={ () => setContentVisible(false) }
          />
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SubmitLocation
