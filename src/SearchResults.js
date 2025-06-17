import React, { useState, useEffect } from 'react';
import './App.css';



function SearchResults() {
  const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setSearchResults(data.Search.map(movie => ({
            title: movie.Title,
            year: movie.Year,
            duration: "N/A",
            type: movie.Type,
            image: movie.Poster !== "N/A" ? movie.Poster : "/assets/trendingVideos/trending1.jpg",
          })));
        } else {
          setSearchResults([]);
          setError('No results found.');
        }
      } catch (err) {
        setError('Failed to fetch movies.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const displayMovies = (movies) => {
    return movies.map(movie => (
      <div className="movie-card" key={movie.title + movie.year}>
        <div className="img-card">
          <img className="card" src={movie.image} alt={movie.title} />
        </div>
        <div className="title-info">
          <p className="movie-title">{movie.title}</p>
          <p className="movie-info">{movie.year} • {movie.duration}</p>
          <button className="movie-btn">{movie.type}</button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <header>
        <div className="logo-container">
          <a href="/">
            <img src="/assets/logo/logo-removebg-preview.png" className="logo" alt="Logo" />
          </a>
        </div>
        <nav id="nav-menu" className={isNavOpen ? 'active' : ''}>
          <ul>
            <li><a href="/">home</a></li>
            <li><a href="/movies">movies</a></li>
            <li><a href="/tv-shows">tv shows</a></li>
            <li className="relative">
              <span id="genre-toggle">genres</span>
              <div className="genre-dropdown" id="genre-dropdown">
                <a href="/genres?action">Action</a>
                <a href="/genres?drama">Drama</a>
                <a href="/genres?comedy">Comedy</a>
                <a href="/genres?horror">Horror</a>
              </div>
            </li>
          </ul>
        </nav>
        <div className="search-box">
          <input
            className="input-search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <i className="fa-solid fa-arrow-right" onClick={handleSearch}></i>
        </div>
        <div className="hamburger" id="hamburger" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <main>
        <h1>Search Results for "{searchTerm || 'No Query'}"</h1>
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status">{error}</p>}
        {searchResults.length > 0 && (
          <section className="movie-section border" id="search-results">
            {displayMovies(searchResults)}
          </section>
        )}
        {!loading && !error && searchResults.length === 0 && searchTerm && (
          <p className="status">No movies found.</p>
        )}
      </main>
      <footer>
        <div className="end-info">
          <div className="info-info">
            <div className="logo-container2">
              <a href="/">
                <img className="logo2" src="/assets/logo/logo-removebg-preview.png" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="info-info">
            <p className="copywrite-tobbihub">© Tobbihub 2025</p>
          </div>
        </div>
        <div className="end-info">
          <p className="tobihub-info">
            Tobbihub is a Free Movies streaming site with zero ads. We let you
            watch movies online without having to register or paying, with over
            10000 movies and TV-Series. You can also Download full movies from
            Tobbihub and watch it later if you want.
          </p>
          <div className="social-info">
            <p className="tobihub-info"><a href="/sitemap">Sitemap</a></p>
            <p className="tobihub-info"><a href="/terms">Terms of Service</a></p>
            <p className="tobihub-info"><a href="/contact">Contact</a></p>
          </div>
        </div>
        <div className="end-info">
          <div className="last-info">
            <div className="last-last-info">
              <p className="tobihub-info">
                Tobbihub does not store any files on our server, we only linked to
                the media which is hosted on 3rd party services.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SearchResults;