const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${process.env.OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching OMDB data:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

router.get('/movies', (req, res) => {
  res.json({ message: 'Movies data will be here' });
});

router.get('/tv-shows', (req, res) => {
  res.json({ message: 'TV Shows data will be here' });
});

router.get('/genres', (req, res) => {
  res.json({ message: 'Genres data will be here' });
});

module.exports = router;