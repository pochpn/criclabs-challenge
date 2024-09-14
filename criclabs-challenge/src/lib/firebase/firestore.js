import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  runTransaction,
  where,
  query,
  orderBy,
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

  const data = colSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  data.sort((a, b) => a.title.localeCompare(b.title));

  return data;
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
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function updateDataMapping(id, data) {
  const docRef = doc(db, "data-mapping", id);

  try {
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function deleteDataMapping(id) {
  const docRef = doc(db, "data-mapping", id);

  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

export async function getDataMappingByFilter(filters) {
  const colRef = collection(db, "data-mapping");
  let queries = [];

  // Filter department
  if (filters.department && filters.department.length > 0) {
    queries.push(where("department", "in", filters.department));
  }

  // Filter dataSubjectType
  if (filters.dataSubjectType && filters.dataSubjectType.length > 0) {
    queries.push(
      where("dataSubjectType", "array-contains-any", filters.dataSubjectType)
    );
  }

  let q = query(colRef, ...queries);

  try {
    const querySnapshot = await getDocs(q);
    const filteredData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      //Filter Title
      if (filters.title) {
        if (data.title.toLowerCase().includes(filters.title.toLowerCase())) {
          filteredData.push({ id: doc.id, ...data });
        }
      } else {
        filteredData.push({ id: doc.id, ...data });
      }
    });

    filteredData.sort((a, b) => a.title.localeCompare(b.title));

    return filteredData;
  } catch (error) {
    console.error("Error fetching data mappings: ", error);
  }
}
