import * as fb from 'firebase'  // Should not be used elsewhere in the project
import { DocumentSnapshot, DocumentData, QueryDocumentSnapshot } from '@firebase/firestore-types';
import { NavigationScreenProp } from 'react-navigation';

require('firebase/firestore')
require('firebase/functions')

fb.initializeApp(Expo.Constants.manifest.extra.firebase);

const createUser = fb.functions().httpsCallable('createUser')

export const db = fb.firestore()
export const firebase = fb

// TODO: Move to its own service
class Auth {
  private _auth: fb.auth.Auth

  constructor() {
    this._auth = fb.auth()
  }

  // TODO: Have these return the error if there is one rather than a firebase error
  public async login(email: string, password: string): Promise<string | null> {
    let errorMessage = null
    try {
      await this._auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      errorMessage = error.message
    }

    return errorMessage
  }
  // TODO: Have these return the error if there is one rather than a firebase error
  public async register(email: string, password: string): Promise<string | null> {
    let errorMessage = null
    try {
      await this._auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      errorMessage = error.message
    }

    return errorMessage
  }

  public handleAuthState(navigation: NavigationScreenProp<any>, context) {
    this._auth.onAuthStateChanged((user: fb.User) => {
      if (user != null) {
        db.collection('users').doc(user.uid).get()
          .then(async (doc: DocumentSnapshot) => {
            if (doc.exists) {
              // TODO: This should be its own function like redirectUser(user, context)
              this.redirectUser(doc.data(), navigation, context)
            } else {
              // cloud func to create user
              createUser({ uid: user.uid, email: user.email })
                .then(result => {
                  context.setUser(result)
                  navigation.navigate('App')
                })
            }
          })
      } else {
        navigation.navigate('Auth')
      }
    })
  }

  private async redirectUser(user: DocumentData, navigation: NavigationScreenProp<any>, context) {
    context.setUser(user)
    // Check if user is in active hunt
    try {
      const querySnapshot = await this.getUsersActiveHunt(user)
      if (querySnapshot.empty) {
        navigation.navigate('App')
      } else {
        // Can only be one
        querySnapshot.forEach(activeHuntPivot => {
          this.setActiveHuntContext(activeHuntPivot, context)
        })
        navigation.navigate('Hunt')
      }
    } catch (error) {
      console.log(error)
      // Should probably redirect to App or something and clear out the context?
    }
  }


  private setActiveHuntContext(activeHuntPivot: QueryDocumentSnapshot, context) {
    // While we could just pass this as nav params when we nav to the Hunt screen,
    // we'll likely want to know this from other components so we can be like
    // "Hey man you're suppoed to be in a hunt! Get back to it!"
    context.setActiveHuntPivotId(activeHuntPivot.id)
  }

  private async getUsersActiveHunt(user: DocumentData) {
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
}

export const auth = new Auth
