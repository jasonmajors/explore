import console = require("console");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// const userSetup = (userRecord, context) => {
//   const { email, uid } = userRecord;

//   return db
//     .collection('Users')c
//     .doc(uid)
//     .set({ email })
//     .catch(console.error);
// };

const userSetup = (userData, context) => {
  const { email, uid } = userData

  return db.collection('Users').doc(uid).get().then(user => {
    if (user.exists) {
      // TODO: We'll return the actual data we want here
      return {message: 'user already exists - doing nothing'}
    } else {
      db.collection('Users')
      .doc(uid)
      .set({ email })
      .catch(console.error)
      // TODO: We'll return the actual data we want here
      return {message: 'I made the user!'}
    }
  })
}

module.exports = {
  onNewUser: functions.https.onCall(userSetup),
  // authOnCreate: functions.auth.user().onCreate(userSetup),
};
