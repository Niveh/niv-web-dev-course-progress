import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	const date = new Date();
	const currentDay = date.getDay();
	let day = "";

	switch (currentDay) {
		case 0:
			day = "Sunday";
			break;
		case 1:
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;
		default:
			console.log(`Error: current day is equal to: ${currentDay}`);
	}

	res.render("list", { kindOfDay: day });
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
