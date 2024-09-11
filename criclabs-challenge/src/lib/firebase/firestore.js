import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase/clientApp";

export async function updateRestaurantImageReference(
  restaurantId,
  publicImageUrl
) {
  const restaurantRef = doc(collection(db, "data-mapping"), restaurantId);
  if (restaurantRef) {
    await updateDoc(restaurantRef, { photo: publicImageUrl });
  }
}

export async function getAllDataMapping() {
  const colRef = collection(db, "data-mapping");
  const colSnap = await getDocs(colRef);

  return colSnap.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export async function addDataMapping(data) {
  const sequenceRef = doc(db, "sequences", "dataMappingId");
  const colRef = collection(db, "data-mapping");

  try {
    await runTransaction(db, async (transaction) => {
      const sequenceDoc = await transaction.get(sequenceRef);
      const newId = sequenceDoc.data().current;
      transaction.update(sequenceRef, { current: newId + 1 });
      transaction.set(doc(colRef, String(newId)), data);
    });
    console.log("Document added successfully");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function updateDataMapping(id, data) {
  const docRef = doc(db, "data-mapping", id);

  try {
    await updateDoc(docRef, data);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function deleteDataMapping(id) {
  const docRef = doc(db, "data-mapping", id);

  try {
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}
