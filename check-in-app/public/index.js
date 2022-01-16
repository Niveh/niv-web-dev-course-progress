// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {
	getDatabase,
	ref,
	set,
	get,
	child,
	onValue,
	update,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Live Config
const firebaseConfig = {
	apiKey: "AIzaSyB0mlc7nH2iXoFRRR-sF3grh3Aq6gUukV4",
	authDomain: "check-in-54703.firebaseapp.com",
	databaseURL:
		"https://check-in-54703-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "check-in-54703",
	storageBucket: "check-in-54703.appspot.com",
	messagingSenderId: "212369265058",
	appId: "1:212369265058:web:b80a83ef2a61eacddd22fb",
};

// Development Config
// const firebaseConfig = {
// 	apiKey: "AIzaSyAy9R7IpdQbblZtRskK-dzrlmf4w7IBAh8",
// 	authDomain: "check-in-development-dc06f.firebaseapp.com",
// 	databaseURL:
// 		"https://check-in-development-dc06f-default-rtdb.europe-west1.firebasedatabase.app",
// 	projectId: "check-in-development-dc06f",
// 	storageBucket: "check-in-development-dc06f.appspot.com",
// 	messagingSenderId: "1086106887898",
// 	appId: "1:1086106887898:web:b053d935d2636ed2fce7e3",
// };

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
		const popup = document.getElementById("sign-in-error");

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				popup.classList.add("hidden");
				popup.textContent = "";

				document.getElementById("login-email").value = "";
				document.getElementById("login-password").value = "";
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// console.log(`ERROR ${errorCode}: ${errorMessage}`);

				popup.classList.remove("hidden");
				popup.textContent = errorMessage;

				document.getElementById("login-password").value = "";
			});
	});

document
	.getElementById("sign-up-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		const email = document.getElementById("register-email").value;
		const password = document.getElementById("register-password").value;
		const popup = document.getElementById("sign-up-error");
		const closeModalBtn = document.getElementById("close-modal");

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				set(ref(db, "users/" + user.uid), {
					email: email,
					workData: workData,
					username: "",
				});

				popup.classList.add("hidden");
				popup.textContent = "";
				closeModalBtn.click();

				document.getElementById("register-email").value = "";
				document.getElementById("register-password").value = "";
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// console.log(`ERROR ${errorCode}: ${errorMessage}`);

				popup.classList.remove("hidden");
				popup.textContent = errorMessage;

				document.getElementById("register-password").value = "";
			});
	});

document.getElementById("set-username").addEventListener("click", function (e) {
	e.preventDefault();
	const popupError = document.getElementById("set-username-error");
	const popupSuccess = document.getElementById("set-username-success");
	const usernameField = document.getElementById("username-field");

	popupError.textContent = "";
	popupError.classList.add("hidden");
	popupSuccess.textContent = "";
	popupSuccess.classList.add("hidden");
	usernameField.value = "";
});

document
	.getElementById("set-username-save")
	.addEventListener("click", function (e) {
		e.preventDefault();

		const username = document.getElementById("username-field").value;
		const closeUsernameModal = document.getElementById(
			"close-username-modal"
		);
		const popupError = document.getElementById("set-username-error");
		const popupSuccess = document.getElementById("set-username-success");

		const user = auth.currentUser;
		if (user !== null) {
			updateProfile(user, {
				displayName: username,
			})
				.then(() => {
					// Success
					popupSuccess.textContent = "Successfully changed username!";
					popupSuccess.classList.remove("hidden");

					popupError.textContent = "";
					popupError.classList.add("hidden");
					document.getElementById(
						"welcome-display-name"
					).textContent = `${
						user.displayName ? user.displayName + "." : user.email
					}`;

					if (user.displayName) {
						document.getElementById("set-username").textContent =
							"Change display name";
					} else {
						document.getElementById("set-username").textContent =
							"Set display name";
					}
				})
				.catch((error) => {
					// Fail
					popupError.textContent = error.message;
					popupError.classList.remove("hidden");
				});

			update(ref(db, "users/" + user.uid), {
				username: username,
			});
		}
	});

document.getElementById("save-work").addEventListener("click", function (e) {
	e.preventDefault();

	const user = auth.currentUser;
	if (user !== null) {
		// console.log(user, workData);
		update(ref(db, "users/" + user.uid), {
			workData: workData,
		});
	}
});

document.getElementById("sign-out").addEventListener("click", function (e) {
	e.preventDefault();

	signOut(auth)
		.then(() => {
			// Signed out
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		})
		.catch((error) => {
			// Error occured
		});
});

onAuthStateChanged(auth, (user) => {
	if (user) {
		// Signed in
		const uid = user.uid;
		// console.log("Login", uid);
		document.getElementById("welcome-display-name").textContent = `${
			user.displayName ? user.displayName + "." : user.email
		}`;

		if (user.displayName) {
			document.getElementById("set-username").textContent =
				"Change display name";
		} else {
			document.getElementById("set-username").textContent =
				"Set display name";
		}

		document.body.scrollTop = document.documentElement.scrollTop = 0;
		document.getElementById("main-container").classList.add("hidden");
		document.getElementById("work-container").classList.remove("hidden");

		onValue(ref(db, "users/" + uid + "/workData"), (snapshot) => {
			const data = snapshot.val();
			if (data) {
				updateSelections(data);
			}
		});
	} else {
		// Signed out
		// console.log("user signed out");
		document.getElementById("main-container").classList.remove("hidden");
		document.getElementById("work-container").classList.add("hidden");

		resetWorkData();
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

onValue(ref(db, "users/"), (snapshot) => {
	const data = snapshot.val();
	updateTable(data);
});

const updateTable = (data) => {
	const table = document.getElementById("work-table");
	table.innerHTML = "";

	for (const user in data) {
		const userData = data[user].workData;
		let fullData = true;

		for (const day in userData) {
			if (!userData[day]) {
				fullData = false;
				break;
			}
		}

		if (!fullData) {
			// console.log(`Skipping ${email} - not full`);
			continue;
		}

		let username = "";
		if (data[user]["username"]) {
			username = data[user]["username"];
		} else {
			username = data[user].email;
		}

		table.innerHTML += `<tr>
                            <th scope="row">${username}</th>
                            <td class="table-${
								userData["sunday"] === "yes" ? "yes" : "no"
							}"></td>
                            <td class="table-${
								userData["monday"] === "yes" ? "yes" : "no"
							}"></td>
							<td class="table-${userData["tuesday"] === "yes" ? "yes" : "no"}"></td>
							<td class="table-${userData["wednesday"] === "yes" ? "yes" : "no"}"></td>
							<td class="table-${userData["thursday"] === "yes" ? "yes" : "no"}"></td>
                        </tr>`;
	}
};

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

const resetWorkData = () => {
	workData["sunday"] = "";
	workData["monday"] = "";
	workData["tuesday"] = "";
	workData["wednesday"] = "";
	workData["thursday"] = "";

	document.querySelectorAll(".btn-work").forEach((btn) => {
		const day = btn.id.slice(0, btn.id.indexOf("-"));
		const card = document.getElementById(day);

		card.classList.remove("yes");
		card.classList.remove("no");

		if (btn.id.includes("yes")) {
			btn.classList.remove("btn-success");
			btn.classList.add("btn-outline-success");
		} else if (btn.id.includes("no")) {
			btn.classList.remove("btn-danger");
			btn.classList.add("btn-outline-danger");
		}
	});
};
