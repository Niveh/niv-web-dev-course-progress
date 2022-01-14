// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {
	getDatabase,
	ref,
	set,
	onValue,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

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
const auth = getAuth();
const db = getDatabase(app);

const workData = {
	sunday: "",
	monday: "",
	tuesday: "",
	wednesday: "",
	thursday: "",
};

document
	.getElementById("sign-in-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		const email = document.getElementById("login-email").value;
		const password = document.getElementById("login-password").value;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(`ERROR ${errorCode}: ${errorMessage}`);
			});
	});

document
	.getElementById("sign-up-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		const email = document.getElementById("register-email").value;
		const password = document.getElementById("register-password").value;

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(`ERROR ${errorCode}: ${errorMessage}`);
			});
	});

document.getElementById("sign-out").addEventListener("click", function (e) {
	e.preventDefault();

	const user = auth.currentUser;
	if (user !== null) {
		// console.log(user, workData);
		set(ref(db, "users/" + user.uid), {
			email: user.email,
			workData: workData,
		});
	}

	signOut(auth)
		.then(() => {
			// Signed out
		})
		.catch((error) => {
			// Error occured
		});
});

onAuthStateChanged(auth, (user) => {
	if (user) {
		// Signed in
		const uid = user.uid;
		console.log("Login", uid);
		document.getElementById("main-container").classList.add("hidden");
		document.getElementById("work-container").classList.remove("hidden");
		document.getElementById(
			"welcome-email"
		).innerHTML = `Hello ${user.email}<br>What days are you working?`;

		onValue(ref(db, "users/" + uid + "/workData"), (snapshot) => {
			const data = snapshot.val();
			updateSelections(data);
		});
	} else {
		// Signed out
		console.log("user signed out");
		document.getElementById("main-container").classList.remove("hidden");
		document.getElementById("work-container").classList.add("hidden");
	}
});

document.querySelectorAll(".btn-work").forEach((btn) => {
	btn.addEventListener("click", function (e) {
		const day = this.id.slice(0, this.id.indexOf("-"));
		const card = document.getElementById(day);

		if (this.textContent === "Yes") {
			if (card.classList.contains("yes")) {
				// Deselect if already selected
				card.classList.remove("yes");
				this.classList.remove("btn-success");
				this.classList.add("btn-outline-success");
				workData[day] = "";
			} else {
				// Select if not selected
				card.classList.add("yes");
				card.classList.remove("no");
				this.classList.add("btn-success");
				this.classList.remove("btn-outline-success");

				// Deselect other option if selected
				const opposite = document.getElementById(`${day}-no`);
				opposite.classList.remove("btn-danger");
				opposite.classList.add("btn-outline-danger");

				// Save to work data
				workData[day] = "yes";
			}
		} else if (this.textContent === "No") {
			if (card.classList.contains("no")) {
				// Deselect if already selected
				card.classList.remove("no");
				this.classList.remove("btn-danger");
				this.classList.add("btn-outline-danger");
				workData[day] = "";
			} else {
				// Select if not selected
				card.classList.add("no");
				card.classList.remove("yes");
				this.classList.add("btn-danger");
				this.classList.remove("btn-outline-danger");

				// Deselect other option if selected
				const opposite = document.getElementById(`${day}-yes`);
				opposite.classList.remove("btn-success");
				opposite.classList.add("btn-outline-success");

				// Save to work data
				workData[day] = "no";
			}
		}
	});
});

const updateSelections = (data) => {
	document.querySelectorAll(".btn-work").forEach((btn) => {
		const day = btn.id.slice(0, btn.id.indexOf("-"));
		const card = document.getElementById(day);
		if (data[day].includes("yes")) {
			if (btn.id.includes("yes")) {
				card.classList.add("yes");
				card.classList.remove("no");
				btn.classList.add("btn-success");
				btn.classList.remove("btn-outline-success");
				workData[day] = "yes";
			}
		} else if (data[day].includes("no")) {
			if (btn.id.includes("no")) {
				card.classList.add("no");
				card.classList.remove("yes");
				btn.classList.add("btn-danger");
				btn.classList.remove("btn-outline-danger");
				workData[day] = "no";
			}
		}
	});
};
