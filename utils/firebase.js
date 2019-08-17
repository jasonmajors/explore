import * as firebase from 'firebase'  // Should not be used elsewhere in the project

firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

firebase.listenForAuth = (props) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      // Send user to main stack
      props.navigation.navigate('App')
    } else {
      props.navigation.navigate('Auth')
    }
  });
}

export default firebase;
