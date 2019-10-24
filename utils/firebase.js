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
        .then(async user => {
          if (user.exists) {
            // TODO: This should be its own function like redirectUser(user, context)
            redirectUser(user, props, context)
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

async function getUsersActiveHunt(user) {
  const start = new Date('2019-01-01')
  const results = await db.collection('hunts_teams_users')
    .where('userId', '==', user.uid)
    .where('startedAt', '>', start)
    .where('finishedAt', '==', null)
    .where('cancelledAt', '==', null)
    .limit(1)
    .get()

  return results
}

async function redirectUser(user, props, context) {
  context.setUser(user.data())
  // Check if user is in active hunt
  try {
    const activeHuntResult = await getUsersActiveHunt(user.data())
    if (activeHuntResult.empty) {
      props.navigation.navigate('App')
    } else {
      // Can only be one
      activeHuntResult.forEach(hunt => {
        setHuntContext(hunt, context)
      })
      props.navigation.navigate('Hunt')
    }
  } catch (error) {
    console.log(error)
    // Should probably redirect to App or something and clear out the context?
  }
}

function setHuntContext(hunt, context) {
  const { huntId, teamId } = hunt.data()

  context.setTeamId(teamId)
  context.setHuntId(huntId)
}

module.exports = {
  firebase,
  listenForAuth,
  db,
}
