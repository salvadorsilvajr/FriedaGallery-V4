import { useReducer, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import {
  ProductReducer,
  ProductsInitialState,
} from "../reducer/ProductReducer";
import { collection, onSnapshot, db, query } from "../firebase/config";
import { toast } from "react-toastify";

export default function MyProvider({ children }) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [ProductsState, dispatchProducts] = useReducer(
    ProductReducer,
    ProductsInitialState,
  );

  useEffect(() => {
    setIsPending(true);
    let ref = query(collection(db, "projects"));

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          // console.log(doc.id);
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setError(null);
        setIsPending(false);
        dispatchProducts({ type: "SET_ITEMS", payload: results });
      },
      (err) => {
        toast.error(`"Error .."+${err.message} `);
        console.log(error);
        if (!isCancelled) {
          setError(err);
          setIsPending(false);
        }
      },
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, []);

  const value = { ProductsState, dispatchProducts };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
