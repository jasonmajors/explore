import * as fb from 'firebase'  // Should not be used elsewhere in the project
import Constants from 'expo-constants';

require('firebase/firestore')
require('firebase/functions')

fb.initializeApp(Constants.manifest.extra.firebase);

export const db = fb.firestore()
export const firebase = fb
