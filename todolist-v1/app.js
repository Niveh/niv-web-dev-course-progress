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

app.get("/", function (req, res) {
	const today = new Date();

	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};

	const day = today.toLocaleDateString("en-US", options);

	res.render("list", {
		kindOfDay: day,
		newListItems: items,
	});
});

app.post("/", function (req, res) {
	const item = req.body.newItem;
	items.push(item);

	res.redirect("/");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
