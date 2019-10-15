import {
  Node,
  GeoEncodeApiResponse,
  GeoLocation,
  Hunt
} from '../types/geocoding'
import { Firebase } from '../firebase'

const request = require('request-promise');

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
  const key = Firebase.functions.config().geocode.key
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
  return new Firebase.admin.firestore.GeoPoint(location.lat, location.lng)
}

/**
 * Adds the GeoPoint long/lat data to a Hunt
 *
 * @param hunt Hunt
 * @param change
 */
export async function addCoordinates(hunt: Hunt, change): Promise<void> {
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
            Firebase.db.collection('hunts').doc(change.after.id).update({
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
