const express = require("express");
const mongoose = require("mongoose");

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const toKebabCase = (string) => string.replace(/\s+/g, "-").toLowerCase();

const capitalize = (string) =>
	string
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
		.join(" ");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
	"mongodb+srv://xoniv:dbniv@cluster0.m9x1m.mongodb.net/blogDB?retryWrites=true&w=majority"
);

const postsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Post title missing"],
	},
	body: {
		type: String,
		required: [true, "Post body has no content"],
	},
	link: {
		type: String,
		required: [true, "Post link missing"],
	},
});

const Post = mongoose.model("Post", postsSchema);

app.get("/", function (req, res) {
	Post.find({}, function (err, posts) {
		if (err) throw err;

		res.render("home", {
			homeStartingContent: homeStartingContent,
			posts: posts,
		});
	});
});

app.get("/about", function (req, res) {
	res.render("about", {
		aboutContent: aboutContent,
	});
});

app.get("/contact", function (req, res) {
	res.render("contact", {
		contactContent: contactContent,
	});
});

app.get("/compose", function (req, res) {
	res.render("compose");
});

app.post("/compose", function (req, res) {
	const post = new Post({
		title: capitalize(req.body.postTitle),
		body: req.body.postBody,
		link: toKebabCase(req.body.postTitle),
	});

	post.save(function (err) {
		if (!err) {
			console.log("Saved post to database.");
			res.redirect("/");
		} else {
			console.log(err);
		}
	});
});

app.get("/posts/:postPath", function (req, res) {
	const postPath = toKebabCase(req.params.postPath);
	Post.findOne({ link: postPath }, function (err, post) {
		if (err) throw err;

		if (post) {
			res.render("post", {
				title: post.title,
				body: post.body,
				link: post.link,
			});
		} else {
			res.send("Post does not exist!");
		}
	});
});

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}

app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});
