import {
	doc,
	updateDoc,
	sendPasswordResetEmail,
	updateProfile,
	db,
	storage,
	auth,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "../firebase/config";
import { toast } from "react-toastify";

export const forgotPass = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		toast.success("Email was sent");
	} catch (error) {
		toast.error("Could not send reset email");
	}
};

export const updateUserPic = (fileName, file, userId, setProgress) => {
	const metadata = {
		contenType: "image/*",
	};
	const storageRef = ref(storage, `userImages/${fileName}`);

	const uploadTask = uploadBytesResumable(storageRef, file, metadata);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress(progress);
			console.log("Upload is " + progress + "% done");
			switch (snapshot.state) {
				case "paused":
					console.log("Upload is paused");
					break;
				case "running":
					console.log("Upload is running");
					break;
				default:
			}
		},
		(error) => {
			switch (error.code) {
				case "storage/unauthorized":
					console.log(error.code);
					// User doesn't have permission to access the object
					break;
				case "storage/canceled":
					// User canceled the upload
					break;

				// ...

				case "storage/unknown":
					// Unknown error occurred, inspect error.serverResponse
					break;
				default:
			}
		},
		() => {
			// Upload completed successfully, now we can get the download URL
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				updateProfile(auth.currentUser, {
					photoURL: downloadURL,
				});
				const updateUserImage = async () => {
					const docRef = doc(db, "UsersTestCss", userId);

					const prodPayload = {
						photoURL: downloadURL,
						photoRef: fileName,
					};

					await updateDoc(docRef, prodPayload)
						.then(() => {
							toast("Fotografia de Usuario Actualizada");
						})
						.catch((error) => {
							console.log(error.message);
							toast.error("Algo salio mal ...", error.message);
						});
				};
				updateUserImage();
			});
		},
	);
};

export const userUpdatePro = (userId, displayName, company, title) => {
	if (!company) {
		company = "";
	}
	if (!title) {
		title = "";
	}
	const updateUserImage = async () => {
		const docRef = doc(db, "UsersTestCss", userId);

		const prodPayload = { displayName, company, title };

		await updateDoc(docRef, prodPayload)
			.then(() => {
				toast("Datos de Usuario Actualizando...");
			})
			.catch((error) => {
				console.log(error.message);
				toast.error("Error no se actualizo la Info...", error.message);
			});
	};
	updateUserImage();
};

export const delOldUserPic = (userOldPic) => {
	const deserRef = ref(storage, `userImages/${userOldPic}`);
	console.log(userOldPic);
	if (userOldPic === "") {
		toast("No exite foto de perfil");
	} else {
		try {
			deleteObject(deserRef);
			toast("Borrando foto de Perfil");
		} catch (error) {
			toast.error("no se pudo borrar la foto..");
		}
	}
};
