const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const path = require('path');
const weatherRoutes = require('./routes/weatherRoutes');
const { getWeatherAndStore } = require('./controllers/weatherController');

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Serve static files from the "public" folder (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Use weather routes
app.use('/api/weather', weatherRoutes);

// Serve index.html for the root path "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Cron job to fetch weather data every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Fetching weather data...');
  getWeatherAndStore();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
