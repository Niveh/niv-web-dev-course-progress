const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	if (err) throw err;
	console.log("Connected to the server");
	const db = client.db("fruitsDB");

	findDocuments(db, function () {
		client.close();
	});
});

const insertDocuments = function (db, callback) {
	const collection = db.collection("fruits");

	collection.insertMany(
		[
			{
				name: "Apple",
				score: 8,
				review: "Great fruit",
			},
			{
				name: "Orange",
				score: 6,
				review: "Kinda sour",
			},
			{
				name: "Banana",
				score: 9,
				review: "Great stuff!",
			},
		],
		function (err, result) {
			if (err) throw err;
			console.log("Inserted documents into the collection");
			callback(result);
		}
	);
};

const findDocuments = function (db, callback) {
	const collection = db.collection("fruits");

	collection.find({}).toArray(function (err, fruits) {
		if (err) throw err;

		console.log("Found the following records");
		console.log(fruits);
		callback(fruits);
	});
};
