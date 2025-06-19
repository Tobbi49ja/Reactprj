const express = require('express');
const axios = require('axios');
const router = express.Router();

// Search route
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Search query is required' });
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${process.env.OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      res.json(response.data);
    } else {
      res.status(404).json({ error: response.data.Error || 'No movies found' });
    }
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Movies route
router.get('/movies', async (req, res) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=popular&type=movie&apikey=${process.env.OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      res.json(response.data);
    } else {
      res.status(404).json({ error: response.data.Error || 'No movies found' });
    }
  } catch (error) {
    console.error('Movies error:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// TV Shows route
router.get('/tv-shows', async (req, res) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=series&type=series&apikey=${process.env.OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      res.json(response.data);
    } else {
      res.status(404).json({ error: response.data.Error || 'No TV shows found' });
    }
  } catch (error) {
    console.error('TV Shows error:', error.message);
    res.status(500).json({ error: 'Failed to fetch TV shows' });
  }
});

// Genres route
router.get('/genres', async (req, res) => {
  const { genre } = req.query;
  if (!genre) return res.status(400).json({ error: 'Genre is required' });
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(genre)}&type=movie&apikey=${process.env.OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      res.json(response.data);
    } else {
      res.status(404).json({ error: response.data.Error || `No ${genre} movies found` });
    }
  } catch (error) {
    console.error('Genres error:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Watch details route
router.get('/watch/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`);
    if (response.data.Response === 'True') {
      res.json(response.data);
    } else {
      res.status(404).json({ error: 'Movie or show not found' });
    }
  } catch (error) {
    console.error('Watch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

// Comments routes (unchanged)
router.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  res.json(commentsStore[id] || []);
});

router.post('/comments/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { username, comment } = req.body;
  if (!username || !comment) {
    return res.status(400).json({ error: 'Username and comment are required' });
  }
  if (!commentsStore[id]) commentsStore[id] = [];
  const newComment = { id: Date.now(), username, comment, timestamp: new Date().toISOString() };
  commentsStore[id].push(newComment);
  res.json(newComment);
});

module.exports = router;