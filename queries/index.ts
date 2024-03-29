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
    currentNode: firebase.firestore.FieldValue.increment(1),
    currentHint: 0,
  })
}

/**
 * Increments the current hint the active hunt is on
 *
 * Note that the hint retrieved will depend on which node the user is on
 *
 * @param activeHuntPivotId
 * @param requiresReset If this is true, we reset back to 0 as to keep cycling the hints *
 */
export const incrementHint = async(activeHuntPivotId: string, requiresReset: boolean = false): Promise<void> => {
  const activeHunt: DocumentReference = await fetchActiveHunt(activeHuntPivotId)
  const update = requiresReset ? 0 : firebase.firestore.FieldValue.increment(1)

  activeHunt.update({
    currentHint: update
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
