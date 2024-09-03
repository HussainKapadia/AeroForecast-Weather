const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const querry = req.body.cityName;
  const apiKey = "43af857eac56b9004304a0e0efdcbe15";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    querry +
    "&appid=" +
    apiKey +
    "&units=metric";
  https.get(url, (response) => {
    // console.log(response.statusCode);
    response.on("data", (data) => {
      // console.log(data);

      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;

      const description = weatherData.weather.description;

      const humidity = weatherData.main.humidity;

      const minTemp = weatherData.main.temp_min;

      const maxTemp = weatherData.main.temp_max;

      const icon = weatherData.weather[0].icon;

      const countryName = weatherData.sys.country;

      const windSpeed = weatherData.wind.speed;

      res.write(
        "<h1>The temperature in " +
          querry +
          " is " +
          temp +
          " degrees celsius</h1>"
      );

      res.write("<p>The humidity in " + querry + " is " + humidity + "%</p>");
    });
  });
});

app.listen(3000, () => console.log("Our port is running on port 3000"));
