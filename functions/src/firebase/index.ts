export module Firebase {
  export const functions = require('firebase-functions')
  export const admin = require('firebase-admin')

  admin.initializeApp()

  export const db = admin.firestore()
}
