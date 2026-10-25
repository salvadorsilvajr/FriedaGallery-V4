import { useState, useEffect } from "react";
import {
	auth,
	signInWithPopup,
	signInWithRedirect,
	updateDoc,
	setDoc,
	getDoc,
	doc,
	db,
	googleprovider,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useGoogle = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signinwithgoogle = async () => {
		setError(null);
		setIsPending(true);

		try {
			const res = await signInWithPopup(auth, googleprovider);

			if (!res) {
				throw new Error("Could not complete the Sign In wiht Google");
			}

			auth.onAuthStateChanged((user) => {
				const docRef = doc(db, "UsersTestCss", user.uid);

				getDoc(docRef)
					.then((docSnap) => {
						if (docSnap.exists()) {
							// Do something with the data
							updateDoc(doc(db, "UsersTestCss", user.uid), {
								online: true,
							});
						} else {
							setDoc(doc(db, "UsersTestCss", res.user.uid), {
								online: true,
								displayName: res.user.displayName,
								isAdmin: "0",
								id: res.user.uid,
								photoURL: res.user.photoURL,
								company: "",
								title: "",
								photoRef: "",
							});
						}
					})
					.catch((error) => {
						console.log("Error getting document:", error);
					});

				dispatch({ type: "LOGIN", payload: user });

				if (!isCancelled) {
					setIsPending(false);
					setError(null);
				}
			});
		} catch (err) {
			toast.error(`"Error .."+${err.message} `, {
				position: "top-center",
				autoClose: 5000,
			});
			if (!isCancelled) {
				setError(err);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		setIsCancelled(false);
		return () => setIsCancelled(true);
	}, []);

	return { signinwithgoogle, isPending, error };
};
