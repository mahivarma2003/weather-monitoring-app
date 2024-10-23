const axios = require('axios');
const WeatherSummary = require('../models/WeatherSummary');
const { checkThresholds } = require('../services/alertService');

// Define cities
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

// Function to store real-time weather data and calculate daily rollups
const getWeatherAndStore = async () => {
  for (const city of cities) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      const weatherData = response.data;
      const tempCelsius = parseFloat(kelvinToCelsius(weatherData.main.temp));
      const condition = weatherData.weather[0].main;

      // Check thresholds and send alerts
      checkThresholds(tempCelsius);

      // Fetch existing summary or create a new one if not available
      let summary = await WeatherSummary.findOne({ city, date: { $gte: new Date().setHours(0, 0, 0, 0) } });

      if (!summary) {
        summary = new WeatherSummary({
          city,
          date: new Date(),
          avgTemp: tempCelsius,
          maxTemp: tempCelsius,
          minTemp: tempCelsius,
          dominantCondition: condition,
          tempReadings: [tempCelsius],
          conditions: [condition]
        });
      } else {
        // Update summary for the day
        summary.tempReadings.push(tempCelsius);
        summary.conditions.push(condition);
        summary.avgTemp = (summary.tempReadings.reduce((a, b) => a + b, 0) / summary.tempReadings.length).toFixed(2);
        summary.maxTemp = Math.max(...summary.tempReadings);
        summary.minTemp = Math.min(...summary.tempReadings);
        summary.dominantCondition = getDominantCondition(summary.conditions);
      }

      // Save summary
      await summary.save();
      console.log(`Weather data for ${city} stored.`);
    } catch (error) {
      console.error(`Error fetching weather data for ${city}: ${error}`);
    }
  }
};

// Helper function to get the dominant weather condition
const getDominantCondition = (conditions) => {
  const count = conditions.reduce((acc, cond) => {
    acc[cond] = (acc[cond] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
};

module.exports = { getWeatherAndStore };
