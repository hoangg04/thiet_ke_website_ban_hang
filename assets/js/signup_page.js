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
const validate = new Validator("#form-signup");
validate.validate();
validate.onSubmit = async function (data) {
	try {
		const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
		await setDoc(doc(firestore, "users", `${credentials.user.uid}`), {
			fullName: data.fullName,
			email: data.email,
			password: data.password,
			data: JSON.stringify({ products: [], likeProducts: [] }),
		});
		await new Toast({
			message:
				"Your account has been created successfully. Redirect to homepage",
			type: "success",
			absoluteEl: document.querySelector(".pop-up"),
		}).init();
		window.location.href = window.location.origin + "/pages/login_page.html"
	} catch (error) {
		console.error(error);
		if (error.code === "auth/email-already-in-use") {
			await new Toast({
				message: "Email already exists. Please choose a different email",
				type: "error",
				absoluteEl: document.querySelector(".pop-up"),
			}).init();
		}
	}
};
