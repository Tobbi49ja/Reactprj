const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serve React build files
app.use(express.static(path.join(__dirname, '../build')));

// OMDB API key (replace with your own)
const OMDB_API_KEY = 'd15dcbc1'; // Replace with your OMDB key

// Search route
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching OMDB data:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Placeholder routes
app.get('/api/movies', (req, res) => {
  res.json({ message: 'Movies data will be here' });
});

app.get('/api/tv-shows', (req, res) => {
  res.json({ message: 'TV Shows data will be here' });
});

app.get('/api/genres', (req, res) => {
  res.json({ message: 'Genres data will be here' });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});