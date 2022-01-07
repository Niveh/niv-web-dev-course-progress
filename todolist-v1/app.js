import express from "express";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function (req, res) {
	const today = new Date();

	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};

	const day = today.toLocaleDateString("en-US", options);

	res.render("list", {
		listTitle: day,
		newListItems: items,
	});
});

app.post("/", function (req, res) {
	const item = req.body.newItem;
	console.log(req.body);
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
	workItems.push(workItems);

	res.redirect("/work");
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
