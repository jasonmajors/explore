import console = require("console")

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const request = require('request-promise')

admin.initializeApp()

const db = admin.firestore()

/**
 * Creates a user record
 */
exports.createUser = functions.https.onCall((userRecord, context) => {
  const { email, uid } = userRecord

  return db.collection('users')
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
exports.setCoordinates = functions.firestore
  .document('hunts/{huntId}')
  .onWrite((change, context) => {
    const hunt = change.after.exists ? change.after.data() : null

    return addCoordinates(hunt, change)
  })

function nodeRequiresCoordinates(node): Boolean {
  return node.longitude === undefined || node.latitude === undefined
}

async function lookUpGeoData(node): Promise<any> {
  const uri = `https://maps.googleapis.com/maps/api/geocode/json`
  const key = functions.config().geocode.key
  const { address } = node
  console.log("Looking up address: ", address)

  const options = {
    uri,
    qs: { key, address },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true, // Automatically parses the JSON string in the response
  }

  return request(options)
}

async function addCoordinates(hunt, change): Promise<void> {
  if (hunt) {
    const numberOfNodes = Object.keys(hunt.nodes).length

    for (var i = 0; i < numberOfNodes; i++) {
      const node = hunt.nodes[i];
      if (nodeRequiresCoordinates(node)) {
        // TODO: Check address updates and recalculate coordinates
        try {
          const response = await lookUpGeoData(node)
          console.log(response)
          if (response.status === "OK") {
            // Just use the first match for now...
            const location = response.results[0].geometry.location
            console.log(location)
            db.collection('hunts').doc(change.after.id).update({
              // TODO: get the real long/lat from the address
              [`nodes.${i}.longtitude`]: location.lng,
              [`nodes.${i}.latitude`]: location.lat
            })
          }
          // TODO: Handle the other responses
          // @see https://developers.google.com/maps/documentation/geocoding/intro#StatusCodes
          else {
            console.log("Something went weird", response)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}

// TODO: Function to clean empty nodes/hints
