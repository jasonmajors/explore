import * as firebase from 'firebase'  // Should not be used elsewhere in the project

require('firebase/functions')
require('firebase/firestore')

firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

const db = firebase.firestore()

function listenForAuth(firebase, props) {
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      props.navigation.navigate('App')
    } else {
      props.navigation.navigate('Auth')
    }
  });
}

module.exports = {
  firebase,
  listenForAuth,
  db
}
