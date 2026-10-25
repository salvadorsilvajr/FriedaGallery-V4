// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	FacebookAuthProvider,
	sendPasswordResetEmail,
} from "firebase/auth";
import {
	getFirestore,
	serverTimestamp,
	Timestamp,
	collection,
	addDoc,
	setDoc,
	getDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
	onSnapshot,
	query,
	where,
	orderBy,
	limit,
} from "firebase/firestore";

import {
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";

// ******* project name in firebase "the-bean-doctor" *******

// const firebaseConfig = {
// 	apiKey: "AIzaSyCpfsIU9CE3J0AlzsnMnXA4DnNUj-k-PAk",
// 	authDomain: "freda-gallery-v4.firebaseapp.com",
// 	projectId: "freda-gallery-v4",
// 	storageBucket: "freda-gallery-v4.firebasestorage.app",
// 	messagingSenderId: "383795076558",
// 	appId: "1:383795076558:web:21e2fe5950651827c7df9f",
// 	measurementId: "G-3JMREKQZ9V",
// };

const firebaseConfig = {
	apiKey: "AIzaSyCpfsIU9CE3J0AlzsnMnXA4DnNUj-k-PAk",
	authDomain: "freda-gallery-v4.firebaseapp.com",
	projectId: "freda-gallery-v4",
	storageBucket: "freda-gallery-v4.firebasestorage.app",
	messagingSenderId: "383795076558",
	appId: "1:383795076558:web:a8e2030ec6b5774ac7df9f",
	measurementId: "G-1D3T24ZE88",
};

// ******* project name in firebase "the-bean-doctor" *******

// ********************** TEST ********************

// const firebaseConfig = {
//   apiKey: "AIzaSyCvanKaZZO655npTXRVEwwCgVivwonmTbo",
//   authDomain: "prueba-firebase-e4105.firebaseapp.com",
//   projectId: "prueba-firebase-e4105",
//   storageBucket: "prueba-firebase-e4105.appspot.com",
//   messagingSenderId: "1053442172195",
//   appId: "1:1053442172195:web:a7a10e4dbca7a336f25896",
// };

// ********************** TEST ********************

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

const auth = getAuth();

const googleprovider = new GoogleAuthProvider();

const facebookprovider = new FacebookAuthProvider();

const db = getFirestore();

export {
	GoogleAuthProvider,
	googleprovider,
	getRedirectResult,
	signInWithPopup,
	signInWithRedirect,
	facebookprovider,
	sendPasswordResetEmail,
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	db,
	collection,
	addDoc,
	setDoc,
	getDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
	onSnapshot,
	where,
	query,
	orderBy,
	limit,
	serverTimestamp,
	Timestamp,
	storage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
};
