import console = require("console")
import { Firebase } from './firebase'
import { addCoordinates } from './geocoding'

/**
 * Creates a user record
 */
exports.createUser = Firebase.functions.https.onCall((userRecord, context) => {
  const { email, uid } = userRecord

  return Firebase.db.collection('users')
    .doc(uid)
    .set({ uid, email, purchasedHunts: [] })
    .then(() => {
      return { uid, email, purchasedHunts: [] }
    })
    .catch(err => console.error(err))
})

/**
 * Set the long/latitude coorindates from the address
 */
exports.setCoordinates = Firebase.functions.firestore
  .document('hunts/{huntId}')
  .onWrite((change, context) => {
    const hunt = change.after.exists ? change.after.data() : null

    return addCoordinates(hunt, change)
  })
