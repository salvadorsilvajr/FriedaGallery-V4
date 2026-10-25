import {
  db,
  Timestamp,
  addDoc,
  updateDoc,
  collection,
  doc,
  deleteDoc,
  ref,
  storage,
  // auth,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "../firebase/config";
import { useEffect, useState } from "react";
import UseProductsContext from "../context/ProductContext";
import { toast } from "react-toastify";

export const Products = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatchProducts } = UseProductsContext();

  // *******************  Create   ***********************************
  const handleAdd = async (formData, collName) => {
    setError(null);
    setIsPending(true);

    const createdAt = Timestamp.fromDate(new Date());
    const productData = {
      ...formData,
      createdAt,
    };

    try {
      const projectdocRef = await addDoc(collection(db, collName), productData);

      await updateDoc(doc(db, collName, projectdocRef.id), {
        id: projectdocRef.id,
      });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      // Dispacht to useReducer
      dispatchProducts({ type: "ADD_ITEM" });
    } catch (err) {
      // console.log(err.message);
      toast.error(`"Error .."+${err.message} `);
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  // **************************  Update ********************************

  const handleUpdate = async (id, formData, collName) => {
    setError(null);
    setIsPending(true);

    try {
      const docRef = doc(db, collName, id);
      await updateDoc(docRef, formData);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      dispatchProducts({ type: "UPDATE_ITEM", payload: { id, formData } });
      // dispatchProducts({ type: "SET_ITEMS", payload: { id, newFormData } });
    } catch (err) {
      toast.error(`"Error .."+${err.message} `);
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  //  **************************  Delete ******************************

  const handleDelete = async (id, collName) => {
    const docRef = doc(db, collName, id);
    await deleteDoc(docRef);
    dispatchProducts({ type: "DELETE_ITEM", payload: id });
    toast.success("Piece delete it Successfully....");
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { handleAdd, handleUpdate, handleDelete, isPending };
};
