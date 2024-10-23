const express = require('express');
const WeatherSummary = require('../models/WeatherSummary');

const router = express.Router();

// Get daily weather summary
router.get('/summary', async (req, res) => {
  try {
    const summaries = await WeatherSummary.find();
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
