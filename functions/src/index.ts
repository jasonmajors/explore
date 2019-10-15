import console = require("console")

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const request = require('request-promise')

admin.initializeApp()

const db = admin.firestore()

type Hunt = {
  nodes: { [index: number]: Node }
};

type Node = {
  longitude: number,
  latitude: number,
  address: string,
};

type GeoEncodeApiResponse = {
  results: Array<GeoEncodeApiResult>,
  status: string,
};

type GeoEncodeApiResult = {
  formatted_address: string,
  geometry: GeoEncodeGeometry,
  place_id: string,
};

type GeoEncodeGeometry = {
  location: GeoLocation,
}

type GeoLocation = {
  lng: number,
  lat: number,
};

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

/**
 * Checks whether or not we need to compute the long/lat of the node
 *
 * @param node Node'
 * @return Boolean
 */
function nodeRequiresCoordinates(node: Node): Boolean {
  // TODO: Check address updates and recalculate coordinates
  return node.longitude === undefined || node.latitude === undefined
}

/**
 * Lookup the long/lat of of a node address
 *
 * @param node
 * @return Promise<any>
 */
async function lookUpGeoData(node: Node): Promise<GeoEncodeApiResponse> {
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

/**
 * Create a GeoPoint object for firestore
 *
 * @param location GeoLocation
 */
function makeGeoPoint(location: GeoLocation) {
  return new admin.firestore.GeoPoint(location.lat, location.lng)
}

/**
 * Adds the GeoPoint long/lat data to a Hunt
 *
 * @param hunt Hunt
 * @param change
 */
async function addCoordinates(hunt: Hunt, change): Promise<void> {
  if (hunt) {
    const numberOfNodes = Object.keys(hunt.nodes).length

    for (var i = 0; i < numberOfNodes; i++) {
      const node = hunt.nodes[i];
      if (nodeRequiresCoordinates(node)) {
        try {
          const response = await lookUpGeoData(node)
          console.log("Geocode API resp:", response)
          if (response.status === "OK") {
            // Just use the first match for now...
            const location: GeoLocation = response.results[0].geometry.location
            db.collection('hunts').doc(change.after.id).update({
              [`nodes.${i}.location`]: makeGeoPoint(location),
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
