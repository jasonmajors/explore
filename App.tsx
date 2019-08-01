import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import { getDistance } from 'geolib';

interface CurrentDestinationTaskParams {
  data: any;
  error: any;
}

const ACCEPTABLE_RADIUS: number = 20;

// const CURRENT_DESTINATION_GEOFENCE = 'current-destination-geofence';

// interface RegionParam {
//   identifier: string,
//   latitude: number,
//   longitude: number,
//   radius: number,
// }

// TaskManager.defineTask(CURRENT_DESTINATION_GEOFENCE, ({ data: { eventType, region }, error } : CurrentDestinationTaskParams) => {
//   if (error) {
//     // check `error.message` for more details.
//     console.log(error.message)
//     return;
//   }
//   if (eventType === Location.GeofencingEventType.Enter) {
//     console.log("You've entered region:", region);
//   } else if (eventType === Location.GeofencingEventType.Exit) {
//     console.log("You've left region:", region);
//   }
// });

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    proximityMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.watchLocation();
      // this.startGeofencingAsync();
    }
  }

  // startGeofencingAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   } else {
  //     const region: RegionParam = {
  //       identifier: 'bonezone',
  //       latitude: 33.7605618,
  //       longitude: -118.1497768,
  //       radius: 5,
  //     }

  //     const regions: RegionParam[] = [region];

  //     let geofencing = await Location.startGeofencingAsync(CURRENT_DESTINATION_GEOFENCE, regions);
  //     console.log('setup geofencing task?')
  //   }
  // }

  watchLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      let locationSubscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 2000,
        distanceInterval: 5,
      }, location => {
        this.setState({ location });
        console.log(location)
        const distance = getDistance(
          { latitude: location.coords.latitude, longitude: location.coords.longitude },
          // Need to load dynamically obviously
          { latitude: 33.7605618, longitude: -118.1497768},
          0.10
        )
        console.log(distance)
        if (distance < ACCEPTABLE_RADIUS) {
          console.log("You are at your destination.")
          this.setState({ proximityMessage: "You are at your destination."})
        } else {
          console.log("You're not there yet")
          this.setState({ proximityMessage: "You're not there yet.'"})
        }
      })
    }
  };

  render() {
    let text = 'Waiting..';
    let message = 'not yet...';

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      message = this.state.proximityMessage;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.paragraph}>{message}</Text>
      </View>
    );
  }
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
