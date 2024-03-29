import { firebase, db } from '../services/firebase'
import { NavigationScreenProp } from 'react-navigation';
import {
  DocumentSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
 } from '@firebase/firestore-types';

class Auth {

  /**
   * @type firebase.auth.Auth
   */
  private _auth: firebase.auth.Auth

  constructor() {
    this._auth = firebase.auth()
  }

  /**
   * Login an existing user
   *
   * @param email
   * @param password
   * @return error If there's an error, we'll return the message, or else we'll return null
   */
  public async login(email: string, password: string): Promise<string | null> {
    let errorMessage = null
    try {
      await this._auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      errorMessage = error.message
    }

    return errorMessage
  }

  /**
   * Registers a new user
   *
   * @param email
   * @param password
   * @return error If there's an error, we'll return the message, or else we'll return null
   */
  public async register(email: string, password: string): Promise<string | null> {
    let errorMessage = null
    try {
      await this._auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      errorMessage = error.message
    }

    return errorMessage
  }

  /**
   * Listen for authentication state changes so we can redirect users as neccesary
   *
   * @param navigation
   * @param context
   */
  public handleAuthState(navigation: NavigationScreenProp<any>, context): void {
    this._auth.onAuthStateChanged((user: firebase.User) => {
      if (user != null) {
        db.collection('users').doc(user.uid).get()
          .then(async (doc: DocumentSnapshot) => {
            if (doc.exists) {
              this.redirectUser(doc.data(), navigation, context)
            } else {
              // cloud func to create user
              const dbUser = await this.createUser(user)
              context.setUser(dbUser)
              navigation.navigate('App')
            }
          })
      } else {
        navigation.navigate('Auth')
      }
    })
  }

  /**
   * Calls a cloud function to create a User in our document store from a firebase User
   *
   * @param user
   */
  private createUser(user: firebase.User): Promise<firebase.functions.HttpsCallableResult> {
    const { uid, email } = user

    return firebase.functions().httpsCallable('createUser')({ uid, email })
  }

  /**
   * Redirect the user to the relevant stack based on whether or not they're in an active hunt
   *
   * @param user
   * @param navigation
   * @param context
   */
  private async redirectUser(user: DocumentData, navigation: NavigationScreenProp<any>, context): Promise<void> {
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

  /**
   * Sets the active hunt the user is doing in the context
   *
   * We want the ID in the context so we can subscribe to it where we need it, rather than just storing its state
   * at this time.
   *
   * @param activeHuntPivot
   * @param context
   */
  private setActiveHuntContext(activeHuntPivot: QueryDocumentSnapshot, context): void {
    context.setActiveHuntPivotId(activeHuntPivot.id)
  }

  // TODO: Should live in a /queries file
  private async getUsersActiveHunt(user: DocumentData): Promise<QuerySnapshot> {
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

export default new Auth
