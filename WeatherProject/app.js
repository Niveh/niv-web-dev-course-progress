import express from "express";
import https from "https";

const app = express();

app.get("/", (req, res) => {
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=London&appid=b310f9b6b92fc23495ceb6bd56b938c4&units=metric";

	https.get(url, (response) => {
		console.log(response.statusCode);

		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;

			console.log(temp);
			console.log(weatherDescription);
		});
	});

	res.send("Server is up and running.");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
