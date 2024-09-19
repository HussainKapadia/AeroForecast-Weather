const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const path = require("path");

const app = express();

// Enable CORS for all origins (or restrict it as needed)
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Make sure to parse JSON bodies as well

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "43af857eac56b9004304a0e0efdcbe15";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  https
    .get(url, (response) => {
      let data = "";

      // Collect data
      response.on("data", (chunk) => {
        data += chunk;
      });

      // Process complete response
      response.on("end", () => {
        try {
          const weatherData = JSON.parse(data);

          if (weatherData.cod !== 200) {
            res.status(weatherData.cod).json({ message: weatherData.message });
            return;
          }

          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const humidity = weatherData.main.humidity;
          const minTemp = weatherData.main.temp_min;
          const maxTemp = weatherData.main.temp_max;
          const icon = weatherData.weather[0].icon;
          const countryName = weatherData.sys.country;
          const windSpeed = weatherData.wind.speed;
          const dt = weatherData.dt;
          res.json({
            cityName: query,
            temp,
            description,
            humidity,
            minTemp,
            maxTemp,
            icon,
            countryName,
            windSpeed,
            dt,
          });
        } catch (error) {
          res.status(500).json({ message: "Oops! Something went wrong." });
        }
      });
    })
    .on("error", (e) => {
      res.status(500).json({ message: `Error: ${e.message}` });
    });
});

app.listen(3001, () => console.log("Server is running on port 3001"));
