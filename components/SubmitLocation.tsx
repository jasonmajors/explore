import React, { useState, useEffect } from "react"
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button } from "react-native-elements";
import { Platform, View, Modal, Text } from "react-native";
import Constants from 'expo-constants';
import { getDistance } from "geolib";
import { Accuracy } from "expo-location";

type SubmitLocationProps = {
  node: any
}

function SubmitLocation(props: SubmitLocationProps) {
  const [response, setResponse] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [visible, setContentVisible] = useState(false)

  const { node } = props

  // TODO: This is dumb here, but whatever - only need it for dev
  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
    } else {
      console.log('here we go')
    }
  })

  const checkLocation = async () => {
    // TODO: We need to ask for permissions somewhere still. Maybe when you start the hunt?
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
    }
    setResponse('')
    setContentVisible(true)
    // TODO: Some loading animation
    const location: Location.LocationData = await Location.getCurrentPositionAsync({
      accuracy: Accuracy.Highest,
      enableHighAccuracy: true
    })
    // TODO: end some loading animation
    const distance: number = getDistance(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      { latitude: node.location.latitude, longitude: node.location.longitude },
      1
    )
    setResponse(distance.toString())
    // TODO: Compare distance to some config in like app.json or something
    console.log('Location: ', location)
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
        <View>
          <Text>{ response }</Text>
          <Button
            title="ok cool"
            onPress={ () => setContentVisible(false) }
          />
        </View>
      </Modal>
    </View>
  )
}

export default SubmitLocation
