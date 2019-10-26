import * as fb from 'firebase'  // Should not be used elsewhere in the project

require('firebase/firestore')
require('firebase/functions')

fb.initializeApp(Expo.Constants.manifest.extra.firebase);

const createUser = fb.functions().httpsCallable('createUser')

export const db = fb.firestore()
export const firebase = fb

export function listenForAuth(firebase, props, context): void {
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      db.collection('users').doc(user.uid).get()
        .then(async (user: any) => {
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
    const querySnapshot = await getUsersActiveHunt(user.data())
    if (querySnapshot.empty) {
      props.navigation.navigate('App')
    } else {
      // Can only be one
      querySnapshot.forEach(activeHuntPivot => {
        setActiveHuntContext(activeHuntPivot, context)
      })
      props.navigation.navigate('Hunt')
    }
  } catch (error) {
    console.log(error)
    // Should probably redirect to App or something and clear out the context?
  }
}

function setActiveHuntContext(activeHuntPivot, context) {
  // While we could just pass this as nav params when we nav to the Hunt screen,
  // we'll likely want to know this from other components so we can be like
  // "Hey man you're suppoed to be in a hunt! Get back to it!"
  context.setActiveHuntPivotId(activeHuntPivot.id)
}
