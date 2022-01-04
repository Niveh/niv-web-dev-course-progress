import express from "express";
import https from "https";

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
	const query = req.body.cityName;
	const apiKey = "b310f9b6b92fc23495ceb6bd56b938c4";
	const units = "metric";

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

	https.get(url, (response) => {
		console.log(response.statusCode);

		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

			res.write(`<p>The weather is currently ${weatherDescription}</p>`);
			res.write(
				`<h1>The temperature in ${weatherData.name} is ${temp} degrees Celcius.</h1>`
			);
			res.write(`<img src="${icon}" alt="weather icon">`);

			res.send();
		});
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
