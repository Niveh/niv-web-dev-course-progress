const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const toKebabCase = (string) => string.replace(/\s+/g, "-").toLowerCase();

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
	"mongodb+srv://xoniv:dbniv@cluster0.m9x1m.mongodb.net/todolistDB"
);

const itemsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "No item named specified"],
	},
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
	name: "Welcome to your todolist!",
});

const item2 = new Item({
	name: "Hit the + button to add a new item.",
});

const item3 = new Item({
	name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
	name: String,
	items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// Item.insertMany(defaultItems, function (err) {
// 	if (err) throw err;

// 	console.log("Successfully saved the default items.");
// });

app.get("/", function (req, res) {
	Item.find({}, function (err, items) {
		if (err) throw err;

		if (!items.length) {
			Item.insertMany(defaultItems, function (err) {
				if (err) throw err;

				console.log("Default items saved to database.");
			});

			res.redirect("/");
		} else {
			res.render("list", {
				listTitle: "Today",
				newListItems: items,
			});
		}
	});
});

app.post("/", function (req, res) {
	const itemName = req.body.newItem;
	const listName = req.body.list;

	const item = new Item({
		name: itemName,
	});

	if (listName === "Today") {
		item.save();
		res.redirect("/");
	} else {
		List.findOne({ name: listName }, function (err, foundList) {
			if (err) throw err;
			console.log(foundList);
			foundList.items.push(item);
			foundList.save();

			res.redirect(`/${listName}`);
		});
	}
});

app.post("/delete", function (req, res) {
	const itemId = req.body.checkbox;
	const listName = req.body.listName;

	if (listName === "Today") {
		Item.findByIdAndRemove(itemId, function (err) {
			if (err) throw err;

			console.log(`Removed item from database.`);
			res.redirect("/");
		});
	} else {
		List.findOneAndUpdate(
			{ name: listName },
			{ $pull: { items: { _id: itemId } } },
			function (err, foundList) {
				if (err) throw err;

				console.log(foundList);
				res.redirect(`/${listName}`);
			}
		);
	}
});

app.get("/:list", function (req, res) {
	const customList = _.capitalize(req.params.list);

	List.findOne({ name: customList }, function (err, results) {
		if (err) throw err;

		if (!results) {
			const list = new List({
				name: customList,
				items: defaultItems,
			});

			list.save();
			res.redirect(`/${customList}`);
		} else {
			res.render("list", {
				listTitle: results.name,
				newListItems: results.items,
			});
		}
	});
});

app.get("/about", function (req, res) {
	res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}

app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});
