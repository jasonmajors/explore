import console = require("console");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.createUser = functions.https.onCall((userRecord, context) => {
  const { email, uid } = userRecord

  return db.collection('users')
    .doc(uid)
    .set({ uid, email, purchasedHunts: [] })
    .then(() => {
      return { uid, email, purchasedHunts: [] }
    })
    .catch(err => console.error(err));
});
