import express from "express";

const app = express();

app.get("/", function (req, res) {
	res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", (req, res) => {
	res.send("Contact me at: niv@gmail.com");
});

app.get("/about", (req, res) => {
	res.send("<h1>Hello.</h1>My name is Niv.");
});

app.get("/hobbies", (req, res) => {
	res.send("<ul><li>Gaming</li><li>Code</li><li>Gym</li></ul>");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
