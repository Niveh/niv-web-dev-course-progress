import express from "express";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
	const { num1, num2 } = req.body;

	const result = Number(num1) + Number(num2);

	res.send(`The result of the calculation is ${result}`);
});

app.get("/bmicalculator", (req, res) => {
	res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/bmicalculator", (req, res) => {
	const weight = parseFloat(req.body.weight);
	const height = parseFloat(req.body.height);

	const bmi = (weight / (height * height)).toFixed(2);

	res.send(`Your BMI is ${bmi}`);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
