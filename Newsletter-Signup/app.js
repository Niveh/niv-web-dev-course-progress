import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
import https from "https";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us20.api.mailchimp.com/3.0/lists/816e4ca5bf";

	const options = {
		method: "POST",
		auth: "xoniv:b38fd0724da52ed24f39d4a457891bd3-us20",
	};

	const request = https.request(url, options, (response) => {
		if (response.statusCode === 200) {
			res.sendFile(`${__dirname}/success.html`);
			response.on("data", (data) => {
				console.log(JSON.parse(data));
			});
		} else {
			res.sendFile(`${__dirname}/failure.html`);
		}
	});

	request.write(jsonData);
	request.end();
});

app.post("/failure", (req, res) => {
	res.redirect("/");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

// b38fd0724da52ed24f39d4a457891bd3-us20
// 816e4ca5bf
