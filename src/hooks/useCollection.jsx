import { useEffect, useState, useRef } from "react";
import {
  db,
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
  limit,
} from "../firebase/config";

export const useCollection = (namecollection, _query, _orderBy) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const qr = useRef(_query).current;
  const ob = useRef(_orderBy).current;

  useEffect(() => {
    let ref = query(collection(db, namecollection));

    if (qr) {
      ref = query(ref, where(...["category", "==", qr]), limit(6));
    }
    if (ob) {
      ref = query(ref, orderBy(...[ob, "desc"]));
      // ref = query(ref, orderBy(...[ob, "desc"]), limit(6));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          // console.log(doc.id);
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      },
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [namecollection, qr, ob]);

  return { documents, error };
};
