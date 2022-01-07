const express = require("express");
const date = require(`./date.js`);

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function (req, res) {
	res.render("list", {
		listTitle: date.getDate(),
		newListItems: items,
	});
});

app.post("/", function (req, res) {
	const item = req.body.newItem;

	if (req.body.list === "Work List") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.get("/work", function (req, res) {
	res.render("list", {
		listTitle: "Work List",
		newListItems: workItems,
	});
});

app.post("/work", function (req, res) {
	const item = req.body.newItem;
	workItems.push(item);

	res.redirect("/work");
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
