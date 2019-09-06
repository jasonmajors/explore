import * as firebase from 'firebase'  // Should not be used elsewhere in the project

require('firebase/firestore')
require('firebase/functions')

firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

const db = firebase.firestore()
const createUser = firebase.functions().httpsCallable('createUser')

function listenForAuth(firebase, props, context) {
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            context.setUser(doc.data())
            props.navigation.navigate('App')
          } else {
            // cloud func to create user
            createUser({ uid: user.uid, email: user.email })
              .then(result => {
                context.setUser(result)
                props.navigation.navigate('App')
              })
          }
        })
    } else {
      props.navigation.navigate('Auth')
    }
  });
}

module.exports = {
  firebase,
  listenForAuth,
  db,
}
