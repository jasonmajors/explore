import * as firebase from 'firebase'  // Should not be used elsewhere in the project

require('firebase/functions');

firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

function listenForAuth(firebase, props) {
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      const { email, uid } = user
      // Called multiple times? Why?
      console.log("here we go!")
      var onNewUser = firebase.functions().httpsCallable('onNewUser')
      onNewUser({ email: email, uid: uid }).then(result => {
        // Have the result from the compute function
        // Can add it to context here like Haney says
        // Then nav to the App
        console.log(result)
        // Send user to main stack
        props.navigation.navigate('App')
      });
    } else {
      props.navigation.navigate('Auth')
    }
  });
}

module.exports = {
  firebase,
  listenForAuth
}
