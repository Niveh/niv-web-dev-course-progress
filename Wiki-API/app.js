const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articlesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Article must have a title"],
	},
	content: {
		type: String,
		required: [true, "Article must has content"],
	},
});

const Article = mongoose.model("Article", articlesSchema);

app.route("/articles")
	.get(function (req, res) {
		Article.find(function (err, articles) {
			if (err) throw err;

			res.send(articles);
		});
	})
	.post(function (req, res) {
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content,
		});

		newArticle.save(function (err) {
			if (err) throw err;

			res.send("Article created successfully!");
		});
	})
	.delete(function (req, res) {
		Article.deleteMany(function (err) {
			if (err) throw err;

			res.send("Deleted all articles successfully");
		});
	});

app.route("/articles/:articleTitle")
	.get(function (req, res) {
		Article.findOne(
			{ title: req.params.articleTitle },
			function (err, foundArticle) {
				if (err) throw err;

				if (foundArticle) {
					res.send(foundArticle);
				} else {
					res.send("No matching articles found.");
				}
			}
		);
	})
	.put(function (req, res) {
		Article.replaceOne(
			{ title: req.params.articleTitle },
			{ title: req.body.title, content: req.body.content },
			function (err) {
				if (err) throw err;

				res.send("Article successfully updated");
			}
		);
	})
	.patch(function (req, res) {
		Article.updateOne(
			{ title: req.params.articleTitle },
			{ title: req.body.title, content: req.body.content },
			function (err) {
				if (err) throw err;

				res.send("Article successfully updated");
			}
		);
	})
	.delete(function (req, res) {
		Article.deleteOne({ title: req.params.articleTitle }, function (err) {
			if (err) throw err;

			res.send("Article successfully deleted!");
		});
	});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
