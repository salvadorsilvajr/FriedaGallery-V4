import {
	addDoc,
	collection,
	doc,
	deleteDoc,
	updateDoc,
	setDoc,
	serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useCollection } from "../hooks/useCollection";

const storage = getStorage();

export const createNewInfoRequest = async (FormData, formatPhoneNumber) => {
	const { nombre, question, comment, email, telefono } = FormData;
	const formDataCopy = {
		...FormData,
		status: 1,
		// telefono: formatPhoneNumber(telefono),
		nombre: nombre.toUpperCase(),
		question,
		comment,
		email,
		// pieceName: pieceName.toUpperCase(),
		timestamp: serverTimestamp(),
	};
	await addDoc(collection(db, "infoRequest"), formDataCopy);
};

export const updateNewInfoRequest = async (id, setShow) => {
	setShow(false);
	console.log(id);
	const docRef = doc(db, "infoRequest", id);

	await updateDoc(docRef, {
		status: 2,
		timestamp: serverTimestamp(),
	})
		.then(() => {
			console.log("Info request Recivido y Archivado...");
			// toast("Info request Recivido y Archivado...");
		})
		.catch((err) => {
			toast.error("No se pudo Actualizar la Info ...", err);
		});
};

export const delNewInfoRequest = async (newCatId) => {
	await deleteDoc(doc(db, "infoRequest", newCatId));
	toast("Infomacion del Cliente Borrada ...");
};

export const delPic = (userOldPic) => {
	const desertRef = ref(storage, `galleryImages/${userOldPic}`);

	if (userOldPic === "") {
		toast("No exite foto de perfil");
	} else {
		try {
			deleteObject(desertRef);
			toast("Borrando foto de Galeria");
		} catch (error) {
			toast.error("no se pudo borrar la foto..");
		}
	}
};

export const delFotogaleria = async (catId) => {
	deleteDoc(doc(db, "fotosgaleria", catId));
};

export const checkifuserExist = (user) => {
	let oldUser = null;
	const { documents } = useCollection("UsersTestCss");
	console.log(user.id);
	if (user) {
		documents.forEach((u) => {
			console.log(u);
			if (u.id === user.id) {
				oldUser = u;
			} else {
				oldUser = null;
			}
		});

		console.log(oldUser);

		{
			oldUser &&
				// update online status
				updateDoc(doc(db, "UsersTestCss", user.uid), {
					online: true,
				});
		}
		{
			!oldUser;
			// Create a new user
			setDoc(doc(db, "UsersTestCss", user.uid), {
				online: true,
				displayName: user.displayName,
				isAdmin: "0",
				id: user.uid,
				photoURL: user.photoURL,
			});
		}
	}
};
