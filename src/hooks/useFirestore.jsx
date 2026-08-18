import { useReducer, useEffect, useState } from "react";
import {
	db,
	Timestamp,
	// serverTimestamp,
	addDoc,
	updateDoc,
	collection,
	doc,
	deleteDoc,
	ref,
	storage,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "../firebase/config";
import { toast } from "react-toastify";

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return { isPending: true, document: null, success: false, error: null };
		case "ADDED_DOCUMENT":
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			};
		case "DELETED_DOCUMENT":
			return { isPending: false, document: null, success: true, error: null };
		case "ERROR":
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const useFirestore = (namecollection) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	// collection ref
	// const ref = db.collection(namecollection);

	// only dispatch is not cancelled
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// add a document

	const addDocument = async (docu, user, thumbnail) => {
		dispatch({ type: "IS_PENDING" });

		try {
			// upload uset thumbnail
			const storageRef = ref(
				storage,
				`${namecollection}/${user.uid}/${docu.name}`,
			);

			await uploadBytes(storageRef, thumbnail);
			const imgUrl = await getDownloadURL(ref(storage, storageRef));

			const createdAt = Timestamp.fromDate(new Date());

			const userData = {
				...docu,
				createdAt,
				photoURL: imgUrl,
				photoRef: thumbnail.name,
			};

			const docRef = await addDoc(collection(db, "projects"), userData);

			// console.log(docRef.id);

			await updateDoc(doc(db, "projects", docRef.id), {
				id: docRef.id,
			});

			dispatchIfNotCancelled({
				type: "ADDED_DOCUMENT",
				payload: docRef,
			});
		} catch (err) {
			toast.error(`"Error .."+${err.message} `, {
				position: "top-center",
				autoClose: 7000,
			});
			console.log(err);
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	// delete a document
	const deleteDocument = async (id) => {
		dispatch({ type: "IS_PENDING" });

		try {
			await deleteDoc(doc(db, namecollection, id));
			dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
		} catch (err) {
			toast.error(`"Error .."+${err.message} `, {
				position: "top-center",
				autoClose: 7000,
			});
			dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
		}
	};

	// update a document
	const updateDocument = async (id, updates) => {
		dispatch({ type: "IS_PENDING" });

		try {
			const updatedDocument = await updateDoc(doc(db, namecollection, id), {
				comments: updates,
			});
			dispatchIfNotCancelled({
				type: "UPDATED_DOCUMENT",
				payload: updatedDocument,
			});
			return updatedDocument;
		} catch (err) {
			toast.error(`"Error .."+${err.message} `, {
				position: "top-center",
				autoClose: 7000,
			});
			// console.log(error);
			dispatchIfNotCancelled({ type: "ERROR", payload: err });
			return null;
		}
	};

	const deleteImg = async (piece) => {
		const desertRef = ref(
			storage,
			`projects/${piece.createdBy.id}/${piece.photoRef}`,
		);
		try {
			await deleteObject(desertRef).then(() => {
				// File deleted successfully
				console.log("Old  Image deleted");
			});
		} catch (err) {
			toast.error(`"Error .."+${err.message} `, {
				position: "top-center",
				autoClose: 7000,
			});
			console.log(err);
		}
	};

	useEffect(() => {
		setIsCancelled(false);
		return () => setIsCancelled(true);
	}, []);

	return {
		addDocument,
		deleteDocument,
		updateDocument,
		deleteImg,

		response,
	};
};
