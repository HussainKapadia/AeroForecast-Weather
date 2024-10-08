import React, { useEffect, useState } from "react";
import Search from "../search";
import axios from "axios";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Determine the time of day to set background image
  const getBackgroundClass = () => {
    const hour = 18;
    // const hour = new Date().getHours();
    if (hour < 6) return "bg-gray-600"; // Before sunrise
    if (hour < 12) return "bg-sky-400"; // Morning
    if (hour < 15) return "bg-amber-300"; // Afternoon
    if (hour < 19) return "bg-rose-300"; // Evening
    return "bg-gray-600"; // Evening and night
  };

  const API_URL = "http://localhost:3001";

  const fetchWeatherData = async (search) => {
    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { cityName: search },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data, "data");
      if (data) {
        setWeatherData(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Delhi");
  }, []);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  // Make sure to use actual data from weatherData if available
  const weatherIconUrl = weatherData
    ? `http://openweathermap.org/img/w/${weatherData.icon}.png`
    : "default_icon_url.png"; // Fallback icon URL

  return (
    <div className="bg-slate-950 flex justify-center items-center h-screen ">
      <div
        className={` rounded-lg shadow-lg p-8 w-1/2 ${getBackgroundClass()}`}
      >
        <header className="flex justify-center mb-4 p-2">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold ml-2">AeroForecast Weather</h1>
          </div>
        </header>
        <Search
          search={search}
          setSearch={setSearch}
          handleSearch={() => fetchWeatherData(search)}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {weatherData ? (
              <>
                <h2 className="text-2xl font-bold">
                  {weatherData.cityName}, {weatherData.countryName}
                </h2>
                <span className="text-lg">{getCurrentDate()}</span>
                <div className="text-5xl font-bold mb-4 flex">
                  <div id="icon">
                    <img
                      id="weather-icon"
                      src={weatherIconUrl}
                      alt="Weather icon"
                    />
                  </div>
                  {weatherData.temp}°C
                </div>
                <div className="flex justify-start mb-4">
                  <div>
                    <p className="text-lg p-1">
                      Min: {weatherData.minTemp}°C /
                    </p>
                  </div>
                  <div>
                    <p className="text-lg p-1">Max: {weatherData.maxTemp}°C</p>
                  </div>
                </div>
                <p className="text-lg">{weatherData.description}</p>
                <div className="flex justify-around items-center space-x-10 p-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 122.88 74.78"
                        className="w-6 h-6"
                      >
                        <g>
                          <path d="M28.69,53.38c-1.61,0-2.91-1.3-2.91-2.91c0-1.61,1.3-2.91,2.91-2.91h51.37c0.21,0,0.42,0.02,0.62,0.07 c1.84,0.28,3.56,0.8,5.1,1.63c1.7,0.92,3.15,2.19,4.27,3.89c3.85,5.83,3.28,11.24,0.56,15.24c-1.77,2.61-4.47,4.55-7.45,5.57 c-3,1.03-6.32,1.13-9.32,0.03c-4.54-1.66-8.22-5.89-8.76-13.55c-0.11-1.6,1.1-2.98,2.7-3.09c1.6-0.11,2.98,1.1,3.09,2.7 c0.35,4.94,2.41,7.56,4.94,8.48c1.71,0.62,3.67,0.54,5.48-0.08c1.84-0.63,3.48-1.79,4.52-3.32c1.49-2.19,1.71-5.28-0.61-8.79 c-0.57-0.86-1.31-1.51-2.18-1.98c-0.91-0.49-1.97-0.81-3.13-0.99H28.69L28.69,53.38z M15.41,27.21c-1.61,0-2.91-1.3-2.91-2.91 c0-1.61,1.3-2.91,2.91-2.91h51.21c1.17-0.18,2.23-0.5,3.14-0.99c0.87-0.47,1.61-1.12,2.18-1.98c2.32-3.51,2.09-6.6,0.61-8.79 c-1.04-1.53-2.68-2.69-4.52-3.32c-1.81-0.62-3.78-0.7-5.48-0.08c-2.52,0.92-4.59,3.54-4.94,8.48c-0.11,1.6-1.49,2.81-3.09,2.7 c-1.6-0.11-2.81-1.49-2.7-3.09c0.54-7.66,4.22-11.89,8.76-13.55c3-1.09,6.32-0.99,9.32,0.03c2.98,1.02,5.68,2.97,7.45,5.57 c2.72,4,3.29,9.41-0.56,15.24c-1.12,1.7-2.57,2.97-4.27,3.89c-1.54,0.83-3.26,1.35-5.1,1.63c-0.2,0.04-0.41,0.07-0.62,0.07H15.41 L15.41,27.21z M2.91,40.3C1.3,40.3,0,38.99,0,37.39c0-1.61,1.3-2.91,2.91-2.91h107.07c1.17-0.18,2.23-0.5,3.13-0.99 c0.87-0.47,1.61-1.12,2.18-1.98c2.32-3.51,2.09-6.6,0.61-8.79c-1.04-1.53-2.68-2.69-4.52-3.32c-1.81-0.62-3.78-0.7-5.48-0.08 c-2.52,0.92-4.59,3.54-4.94,8.48c-0.11,1.6-1.49,2.81-3.09,2.7c-1.6-0.11-2.81-1.49-2.7-3.09c0.54-7.66,4.22-11.89,8.76-13.55 c3-1.09,6.32-0.99,9.32,0.03c2.98,1.02,5.68,2.97,7.45,5.57c2.72,4,3.29,9.41-0.56,15.24c-1.12,1.7-2.57,2.97-4.27,3.89 c-1.54,0.83-3.26,1.35-5.1,1.63c-0.2,0.04-0.41,0.07-0.62,0.07H2.91L2.91,40.3z" />
                        </g>
                      </svg>
                      <p className="text-lg font-semibold">
                        {weatherData.windSpeed}
                      </p>{" "}
                    </div>
                    <p className="text-sm mt-1">Wind speed</p>{" "}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 83.95 122.88"
                        className="w-6 h-6"
                      >
                        <g>
                          <path d="M44.82,2.28c5.08,21.69,12.03,30.25,19.61,39.58c4.9,6.04,10.06,12.39,15.19,22.47c1.31,2.58,2.39,5.25,3.14,8.06 c0.76,2.84,1.19,5.79,1.19,8.87c0,5.68-1.04,10.99-3.11,15.92c-2.07,4.91-5.16,9.4-9.27,13.46c-4.12,4.05-8.65,7.11-13.6,9.16 c-4.96,2.05-10.3,3.08-16.01,3.08c-5.71,0-11.04-1.03-15.99-3.08c-4.93-2.04-9.45-5.1-13.57-9.16c-4.11-4.06-7.21-8.55-9.28-13.46 C1.04,92.25,0,86.94,0,81.26c0-2.91,0.38-5.7,1.06-8.39c0.67-2.64,1.64-5.18,2.84-7.66c5.02-10.38,10.29-16.84,15.36-23.07 c7.61-9.34,14.79-18.14,19.79-39.85c0.36-1.59,1.95-2.58,3.54-2.22C43.74,0.34,44.57,1.22,44.82,2.28L44.82,2.28z M20.52,70.91 c2.1-0.19,3.95,1.36,4.13,3.45c0.48,5.06,1.59,9.72,3.7,13.74c2.04,3.88,5.08,7.23,9.48,9.8c1.81,1.06,2.42,3.4,1.36,5.21 c-1.06,1.81-3.4,2.42-5.2,1.36c-5.73-3.35-9.69-7.71-12.38-12.82c-2.7-5.14-3.99-10.86-4.54-16.6 C16.88,72.96,18.44,71.1,20.52,70.91L20.52,70.91z M59.85,45.59c-6.68-8.23-12.9-15.88-17.9-31.44 c-5.02,15.66-11.4,23.5-18.1,31.72c-4.86,5.96-9.9,12.14-14.62,21.91c-1.02,2.1-1.85,4.28-2.42,6.55 c-0.56,2.22-0.88,4.52-0.88,6.93c0,4.92,0.88,9.46,2.63,13.63c1.76,4.18,4.43,8.03,7.98,11.54c3.57,3.52,7.47,6.16,11.7,7.91 c4.21,1.74,8.78,2.62,13.72,2.62c4.96,0,9.55-0.88,13.77-2.62c4.22-1.75,8.13-4.39,11.7-7.91c3.55-3.51,6.21-7.36,7.97-11.54 c1.75-4.16,2.63-8.7,2.63-13.63c0-2.57-0.35-5-0.98-7.34c-0.64-2.37-1.56-4.66-2.7-6.9C69.47,57.44,64.54,51.37,59.85,45.59 L59.85,45.59z" />
                        </g>
                      </svg>
                      <p className="text-lg font-semibold">
                        {weatherData.humidity}%
                      </p>
                    </div>
                    <p className="text-sm mt-1">Humidity</p>
                  </div>
                </div>
              </>
            ) : (
              <div>No weather data available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
