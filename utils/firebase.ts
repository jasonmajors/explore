import * as fb from 'firebase'  // Should not be used elsewhere in the project

require('firebase/firestore')
require('firebase/functions')

fb.initializeApp(Expo.Constants.manifest.extra.firebase);

export const db = fb.firestore()
export const firebase = fb
