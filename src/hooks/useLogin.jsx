import { useState, useEffect } from "react";
import {
	auth,
	signInWithEmailAndPassword,
	updateDoc,
	doc,
	db,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);

		try {
			// login
			const res = await signInWithEmailAndPassword(auth, email, password);

			if (!res) {
				throw new Error("Could not complete the Sign In");
			}

			// update online status
			await updateDoc(doc(db, "UsersTestCss", res.user.uid), {
				online: true,
				// photoURL:'/images/logo.png'
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
				autoClose: true,
				closeOnClick: true,
			});
			// console.log(err.message);
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

	return { login, isPending, error };
};
