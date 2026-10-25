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
import { toast } from "react-toastify";

export const addDocument = async (project, fileName, file, setProgress) => {
	try {
		const createdAt = Timestamp.fromDate(new Date());

		const userData = {
			...project,
			createdAt,
		};

		const projectdocRef = await addDoc(collection(db, "projects"), userData);

		await updateDoc(doc(db, "projects", projectdocRef.id), {
			id: projectdocRef.id,
		});

		// ******** add picture and update info in project ******
		const metadata = {
			contenType: "image/*",
		};
		const storageRef = ref(storage, `projects/${fileName}`);

		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
					// updateProfile(auth.currentUser, {
					// 	photoURL: downloadURL,
					// });
					const updateProjectImage = async () => {
						const docRef = doc(db, "projects", projectdocRef.id);

						const prodPayload = {
							photoURL: downloadURL,
							photoRef: fileName,
						};

						await updateDoc(docRef, prodPayload)
							.then(() => {
								toast("Fotografia de Pieza Actualizada");
							})
							.catch((error) => {
								console.log(error.message);
								toast.error("Algo salio mal ...", error.message);
							});
					};
					updateProjectImage();
				});
			},
		);
	} catch (error) {
		console.log(error);
		console.log(error.message);
		// dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
	}
};

// delete a document
export const deleteDocument = async (id) => {
	// dispatch({ type: "IS_PENDING" });

	try {
		await deleteDoc(doc(db, namecollection, id));
		// dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
	} catch (error) {
		console.log(error.message);
		// dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
	}
};

// update a document
export const updateGalleryPic = (fileName, file, projectId, setProgress) => {
	// dispatch({ type: "IS_PENDING" });
	const metadata = {
		contenType: "image/*",
	};
	const storageRef = ref(storage, `projects/${fileName}`);

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
				// updateProfile(auth.currentUser, {
				// 	photoURL: downloadURL,
				// });
				const updateProjectImage = async () => {
					const docRef = doc(db, "projects", projectId);

					const prodPayload = {
						photoURL: downloadURL,
						photoRef: fileName,
					};

					await updateDoc(docRef, prodPayload)
						.then(() => {
							toast("Fotografia de Pieza Actualizada");
						})
						.catch((error) => {
							console.log(error.message);
							toast.error("Algo salio mal ...", error.message);
						});
				};
				updateProjectImage();
			});
		},
	);
};

export const UpdateGalleryInfo = (projectId, pieceName, company, title) => {
	if (!company) {
		company = "";
	}
	if (!title) {
		title = "";
	}
	const updatePiezaImage = async () => {
		const docRef = doc(db, "projects", projectId);

		const prodPayload = { pieceName, company, title };

		await updateDoc(docRef, prodPayload)
			.then(() => {
				toast("Datos de la Pieza Actualizando...");
			})
			.catch((error) => {
				console.log(error.message);
				toast.error("Error no se actualizo la Info...", error.message);
			});
	};
	updatePiezaImage();
};

export const delOldUserPic = (userOldPic) => {
	const deserRef = ref(storage, `projects/${userOldPic}`);
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
