import { db, firebase } from '../services/firebase'
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';

/**
 * Retrieves the hunts_teams_users (active hunt) DocumentReference
 *
 * @param activeHuntPivotId
 */
export const fetchActiveHunt = async(activeHuntPivotId: string): Promise<firebase.firestore.DocumentReference> => {
  return await db.collection('hunts_teams_users').doc(activeHuntPivotId)
}

/**
 * Increments the current node the active hunt is on
 *
 * @param activeHuntPivotId
 */
export const incrementHuntNode = async(activeHuntPivotId: string): Promise<void> => {
  const activeHunt: DocumentReference = await fetchActiveHunt(activeHuntPivotId)

  activeHunt.update({
    currentNode: firebase.firestore.FieldValue.increment(1)
  })
}

/**
 * Marks an active hunt as finished
 *
 * @param activeHuntPivotId
 */
export const setHuntFinished = async(activeHunt: DocumentReference): Promise<void> => {
  const activeHuntResult: DocumentSnapshot = await activeHunt.get()
  const { finishedAt } = activeHuntResult.data()

  if (!finishedAt) {
    activeHunt.update({
      finishedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }
}
