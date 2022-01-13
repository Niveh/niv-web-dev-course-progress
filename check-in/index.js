// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBB-J_LMuZ7nij1hqNe-_wjUbvUPlDb2Zs",
	authDomain: "check-in-86ac8.firebaseapp.com",
	databaseURL:
		"https://check-in-86ac8-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "check-in-86ac8",
	storageBucket: "check-in-86ac8.appspot.com",
	messagingSenderId: "689435073494",
	appId: "1:689435073494:web:658e648e922b428555a277",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

document
	.getElementById("sign-in-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const auth = getAuth();

		const email = document.getElementById("login-email").value;
		const password = document.getElementById("login-password").value;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				console.log("Logged in successfully!");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	});

document
	.getElementById("sign-up-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const auth = getAuth();

		const email = document.getElementById("register-email").value;
		const password = document.getElementById("register-password").value;

		// TODO: Implement if needed
		// const confirmPassword = document.getElementById(
		// 	"register-password-confirm"
		// ).value;

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				console.log("Signed up successfully!");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	});
