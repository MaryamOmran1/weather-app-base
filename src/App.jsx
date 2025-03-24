import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const OPEN_WEATHER_API_KEY = cbbe04b35fb21222d45141cd606f35a2;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get('https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${OPEN_WEATHER_API_KEY}')
      .then ((response) => response.data[0])
      .then ((cityGeoData) => {
        return axios.get (
          'https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric'
        );
      })
      .then((response) => {
        const { data } = response;
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
      });
  };
  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Check Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperatrue: {weatherData.main.temp} C</p>
          <img
            src={'https://openweathermap.org/img/wn/${weatherData.weather[0].icon@2x.png'}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default App;