// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
	getDatabase,
	set,
	get,
	ref,
	onValue,
	onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAxfSBzd7CfclLOaXvgehE0hpEWiMQ47MA",
	authDomain: "chat-app-6de06.firebaseapp.com",
	databaseURL:
		"https://chat-app-6de06-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "chat-app-6de06",
	storageBucket: "chat-app-6de06.appspot.com",
	messagingSenderId: "724087899960",
	appId: "1:724087899960:web:713f1a28564777aa0723cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const username = prompt("Enter your name:");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
	e.preventDefault();

	const timestamp = Date.now();
	const messageInput = document.getElementById("message-input");
	const message = messageInput.value;

	messageInput.value = "";

	document.getElementById("messages").scrollIntoView({
		behavior: "smooth",
		block: "end",
		inline: "nearest",
	});

	set(ref(db, "messages/" + timestamp), {
		username: username,
		message: message,
	});
}

const chatRef = ref(db, "messages/");

onChildAdded(chatRef, function (snapshot) {
	const data = snapshot.val();

	const message = `<li class=${
		username === data.username ? "sent" : "recieve"
	}><span>${data.username}: </span>${data.message}</li>`;

	document.getElementById("messages").innerHTML += message;
});
