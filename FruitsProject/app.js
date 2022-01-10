const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
	useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please check data entry, no name specified!"],
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
	},
	review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
	name: "Apple",
	rating: 7,
	review: "Pretty solid as a fruit",
});

// fruit.save();

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
	name: "John",
	age: 37,
});

// person.save();

// const kiwi = new Fruit({
// 	name: "Kiwi",
// 	rating: 10,
// 	review: "The best fruit!",
// });

// const orange = new Fruit({
// 	name: "Orange",
// 	rating: 4,
// 	review: "Too sour",
// });

// const banana = new Fruit({
// 	name: "Banana",
// 	rating: 3,
// 	review: "Weird texture",
// });

// // Fruit.insertMany([kiwi, orange, banana], function (err) {
// // 	if (err) {
// // 		console.log(err);
// // 	} else {
// // 		console.log("Successfully saved all the fruits to fruitsDB");
// // 	}
// // });

// Fruit.find(function (err, fruits) {
// 	if (err) throw err;

// 	fruits.forEach((fruit) => console.log(fruit.name));
// });

// Fruit.updateOne(
// 	{ _id: "61db52e82bbafded31159577" },
// 	{ rating: 7 },
// 	function (err) {
// 		if (err) throw err;

// 		console.log("Successfully updated the document.");
// 	}
// );

// Fruit.deleteOne({ _id: "61db52e82bbafded31159577" }, function (err) {
// 	if (err) throw err;

// 	console.log("Successfully deleted the fruit.");

// 	mongoose.connection.close();
// });

// Person.deleteMany({ name: "John" }, function (err) {
// 	if (err) throw err;

// 	console.log("Successfully deleted the records.");

// 	mongoose.connection.close();
// });
