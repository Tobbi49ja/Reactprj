const express = require('express');
const axios = require('axios');
const router = express.Router();

// Mock genre data (replace with OMDB or database in production)
const genreMovies = {
  action: [
    { imdbID: 'tt0133093', Title: 'The Matrix', Year: '1999', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
    { imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg' },
  ],
  comedy: [
    { imdbID: 'tt0118715', Title: 'The Big Lebowski', Year: '1998', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SX300.jpg' },
    { imdbID: 'tt0109830', Title: 'Forrest Gump', Year: '1994', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
  ],
  drama: [
    { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
    { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTA4MS00MTI3LWE3YzgtNzY5YzM2YjVhYjU0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg' },
  ],
  horror: [
    { imdbID: 'tt0081505', Title: 'The Shining', Year: '1980', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
    { imdbID: 'tt0078748', Title: 'Alien', Year: '1979', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMmQ2MmIzM2QtMGVkNC00ZGU0LWI5ZjEtZmZmOTM3NzMyNTI5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
  ],
  animation: [
    { imdbID: 'tt0114709', Title: 'Toy Story', Year: '1995', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZDMxMWNmOGU2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
    { imdbID: 'tt0266543', Title: 'Finding Nemo', Year: '2003', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZTAzNWZlNmUtZDEzZi00ZjA5LWIwYjEtZGM1NWE1MjE5YWRhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
  ],
};

// Mock TV shows data
const tvShows = [
  { imdbID: 'tt0903747', Title: 'Breaking Bad', Year: '2008–2013', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTMtZTA3ZWFkNWRmOTJhXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg' },
  { imdbID: 'tt0944947', Title: 'Game of Thrones', Year: '2011–2019', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzZmZS00NTI3LWJjNDYtNDZiMDE1NmQ4ZjM2XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg' },
];

// In-memory comments store (replace with database later)
const commentsStore = {};

// Search route
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Search query is required' });
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${process.env.OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching OMDB data:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Movies route
router.get('/movies', async (req, res) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=popular&type=movie&apikey=${process.env.OMDB_API_KEY}`);
    res.json(response.data.Search || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// TV Shows route
router.get('/tv-shows', (req, res) => {
  res.json(tvShows);
});

// Genres route
router.get('/genres', (req, res) => {
  const { genre } = req.query;
  if (!genre || !genreMovies[genre.toLowerCase()]) {
    return res.status(400).json({ error: 'Invalid or missing genre' });
  }
  res.json(genreMovies[genre.toLowerCase()]);
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
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

// Comments routes
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