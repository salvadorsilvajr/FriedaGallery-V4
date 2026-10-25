import { useState, useEffect } from "react";
import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
	db,
	setDoc,
	doc,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName) => {
		setError(null);
		setIsPending(true);

		try {
			// signup
			const res = await createUserWithEmailAndPassword(auth, email, password);
			// console.log(res);

			if (!res) {
				throw new Error("Could not complete signup");
			}

			// add display name to user
			await updateProfile(auth.currentUser, { displayName });

			//create a user document
			await setDoc(doc(db, "UsersTestCss", res.user.uid), {
				online: true,
				displayName,
				isAdmin: "0",
				id: res.user.uid,
				company: "",
				title: "",
				photoURL: "",
				photoRef: "",
			});

			// dispatch login action
			dispatch({ type: "LOGIN", payload: res.user });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			toast.error(`"Error .."+${err.message} `, {
				position: "top-center",
				autoClose: 7000,
			});
			if (!isCancelled) {
				setError(err.message);
				console.log(err);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		setIsCancelled(false);
		return () => setIsCancelled(true);
	}, []);

	return { signup, error, isPending };
};
