import { useState, useEffect } from "react";
import {
	auth,
	signInWithPopup,
	updateDoc,
	setDoc,
	getDoc,
	doc,
	db,
	facebookprovider,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

import { checkifuserExist } from "../hooks/otherFuntioins";

export const useFacebook = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	// const [faceUser, setFaceUser] = useState(null);
	const { dispatch } = useAuthContext();

	const signinwithfacebook = async () => {
		setError(null);
		setIsPending(true);

		try {
			const res = await signInWithPopup(auth, facebookprovider);
			console.log(res.user);
			res.user.providerData.forEach((profile) => {
				if (profile.providerId === "facebook.com") {
					console.log("Facebook Profile Picture URL: " + profile.photoURL);
				}
			});

			if (!res) {
				throw new Error("Could not complete the Sign In wiht Google");
			}

			auth.onAuthStateChanged((user) => {
				if (user) {
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
						.catch((err) => {
							toast.error(`"Error .."+${err.message} `, {
								position: "top-center",
								autoClose: 7000,
							});
							console.log("Error getting document:", err);
						});

					dispatch({ type: "LOGIN", payload: user });
				}

				if (!isCancelled) {
					setIsPending(false);
					setError(null);
				}
			});

			checkifuserExist(faceUser);
		} catch (err) {
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

	return { signinwithfacebook, isPending, error };
};
