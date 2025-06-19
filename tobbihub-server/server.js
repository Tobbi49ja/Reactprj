const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const apiRouter = require('./routes/api'); // Correct path

dotenv.config();
const app = express();

// Enable CORS for frontend (http://localhost:5173 or your frontend port)
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../tobbihub/dist')));

// API routes
app.use('/api', apiRouter);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../tobbihub/dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err.message);
      res.status(500).send('Server error: Unable to load the application');
    }
  });
});

// Debug routes
app._router?.stack.forEach((layer) => {
  if (layer.route) {
    console.log('Route:', layer.route.path);
  } else if (layer.name === 'router') {
    console.log('Router:', layer.regexp);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err.message, err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});