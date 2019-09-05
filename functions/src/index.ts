import console = require("console");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const newUser = (userRecord, context) => {
  const { email, uid } = userRecord;

  return db
    .collection('users')
    .doc(uid)
    .set({ uid, email, purchasedHunts: [] })
    .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(newUser),
};
