import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
const firebaseConfig = {
	apiKey: "AIzaSyD8ruhJpMfHcmNfwzZdfiz-LvJYGk5Cbx4",
  authDomain: "btl-nhom-8.firebaseapp.com",
  projectId: "btl-nhom-8",
  storageBucket: "btl-nhom-8.appspot.com",
  messagingSenderId: "617589790111",
  appId: "1:617589790111:web:c92f974eb6eba3d49319aa"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storageBucket = getStorage(app);
const StorageBucketRef = ref(storageBucket);
export {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	getDoc,
	doc,
	setDoc,
	updateDoc,
	firestore,
	auth,
	uploadBytes,
	getDownloadURL,
	ref,
	StorageBucketRef,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getAuth,
	updatePassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
	signOut,
	onAuthStateChanged,
	updateProfile,
};
