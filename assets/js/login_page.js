import {
	getDoc,
	StorageBucketRef,
	doc,
	setDoc,
	updateDoc,
	firestore,
	ref,
	auth,
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
	uploadBytes,
	getDownloadURL,
} from "./auth.js";
import Toast from "./toast.js";
import { LocalStorage } from "./storage.js";
import PreviewCart from "./PreviewCart.js";
const validate = new Validator("#form-login");
validate.validate();
validate.onSubmit = async function (data) {
	let userInfoStorage = LocalStorage("infor_user");
	try {
		const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
		const docRef = doc(firestore, "users", `${credentials.user.uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			userInfoStorage.set("fullName", docSnap.data().fullName);
			userInfoStorage.set("email", docSnap.data().email);
			userInfoStorage.set("data", JSON.parse(docSnap.data().data));
			userInfoStorage.set("lastLoginAt", credentials.user.metadata.lastLoginAt);
		}
		await new Toast({
			message: "Login successfully. Redirecting to home page...",
			type: "success",
			absoluteEl: document.querySelector(".pop-up"),
		}).init();
		window.location.href = window.location.origin;
	} catch (error) {
		console.error(error);
		if (error.code === "auth/invalid-credential") {
			("none");
			await new Toast({
				message: "Email or password is wrong. Please try again",
				type: "error",
				absoluteEl: document.querySelector(".pop-up"),
			}).init();
		}
	}
};
