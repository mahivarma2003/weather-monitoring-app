# weather-monitoring-app
# Real-Time Weather Monitoring System with Rollups and Aggregates

## Project Overview
This project is a real-time data processing system designed to monitor weather conditions and provide summarized insights using rollups and aggregates. The system utilizes data from the [OpenWeatherMap API](https://openweathermap.org/) to fetch weather parameters like temperature and weather condition for major metros in India. The system calculates daily summaries, checks alert thresholds, and generates visualizations.

## Features
- **Continuous Weather Data Retrieval:** Fetches real-time weather data for Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) at configurable intervals.
- **Temperature Conversion:** Converts temperatures from Kelvin to Celsius or Fahrenheit based on user preference.
- **Daily Weather Summaries:** Calculates daily averages, maximum and minimum temperatures, and dominant weather conditions.
- **Alerting Mechanism:** Triggers alerts when user-defined thresholds for temperature or weather conditions are breached.
- **Visualizations:** Displays daily weather summaries, historical weather trends, and triggered alerts.

## Technologies Used
- **Backend:** Node.js for real-time data processing.
- **Database:** MongoDB to store weather summaries and alert information.
- **API:** OpenWeatherMap API for weather data.
- **Frontend:** JavaScript, HTML, CSS for data visualizations and alerts.
- **Others:** Docker for containerization.

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or in a cloud environment)
- [Docker](https://www.docker.com/) or [Podman](https://podman.io/) (optional for containerization)
- OpenWeatherMap API Key: Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get your free API key.

### Cloning the Repository
```bash
git clone https://github.com/your-username/weather-monitoring-system.git
cd weather-monitoring-system
