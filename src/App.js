import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import './App.css';

const initialMovies = [
  { title: "Mickey 17", year: 2025, duration: "137m", type: "movie", image: "/assets/trendingVideos/trending1.jpg" },
  { title: "Captain America: Brave...", year: 2025, duration: "115m", type: "movie", image: "/assets/trendingVideos/trending2.jpg" },
  { title: "A Working Man", year: 2025, duration: "movie", type: "movie", image: "/assets/trendingVideos/trending3.jpg" },
  { title: "Alarum", year: 2025, duration: "95m", type: "movie", image: "/assets/trendingVideos/trending4.jpg" },
  { title: "Attack on Titan: THE..", year: 2025, duration: "145m", type: "movie", image: "/assets/trendingVideos/trending5.jpg" },
  { title: "The Woman in the Yard", year: 2025, duration: "87m", type: "movie", image: "/assets/trendingVideos/trending6.jpg" },
  { title: "Absolution", year: 2025, duration: "112m", type: "movie", image: "/assets/trendingVideos/trending7.jpg" },
  { title: "Novocaine", year: 2025, duration: "109m", type: "movie", image: "/assets/trendingVideos/trending8.jpg" },
  { title: "Black Bag", year: 2025, duration: "94m", type: "movie", image: "/assets/trendingVideos/trending9.jpg" },
  { title: "Warfare", year: 2025, duration: "96m", type: "movie", image: "/assets/trendingVideos/trending10.jpg" },
  { title: "Better Man", year: 2024, duration: "135m", type: "movie", image: "/assets/trendingVideos/trending11.jpg" },
  { title: "A Minecraft Movie", year: 2025, duration: "101m", type: "movie", image: "/assets/trendingVideos/trending12.jpg" },
  { title: "G20", year: 2025, duration: "108m", type: "movie", image: "/assets/trendingVideos/trending13.jpg" },
  { title: "The Brutalist", year: 2024, duration: "215m", type: "movie", image: "/assets/trendingVideos/trending14.jpg" },
  { title: "Den of Thieves 2: Pantera", year: 2024, duration: "144m", type: "movie", image: "/assets/trendingVideos/trending16.jpg" },
  { title: "Harry Potter and the...", year: 2001, duration: "152m", type: "movie", image: "/assets/trendingVideos/trending17.jpg" },
  { title: "The Alto Knights", year: 2025, duration: "123m", type: "movie", image: "/assets/trendingVideos/trending18.jpg" },
  { title: "Conclave", year: 2025, duration: "120m", type: "movie", image: "/assets/trendingVideos/trending19.jpg" },
  { title: "Star Wars", year: 2025, duration: "121m", type: "movie", image: "/assets/trendingVideos/trending20.jpg" },
  { title: "in the Lost Lands", year: 2025, duration: "102m", type: "movie", image: "/assets/trendingVideos/trending21.jpg" },
  { title: "The Gorge", year: 2025, duration: "127m", type: "movie", image: "/assets/trendingVideos/trending22.jpg" },
  { title: "Joker", year: 2019, duration: "118m", type: "movie", image: "/assets/trendingVideos/trending23.jpg" },
  { title: "The Retirement Plan", year: 2023, duration: "103m", type: "movie", image: "/assets/trendingVideos/trending24.jpg" },
  { title: "Sonic the Hedgehog 3", year: 2024, duration: "110m", type: "movie", image: "/assets/trendingVideos/trending15.jpg" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const query = new URLSearchParams(window.location.search).get('q');

  useEffect(() => {
    setIsSearchPage(!!query);
  }, [query]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const displayMovies = (movies, containerId) => {
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

  if (isSearchPage) {
    return <SearchResults />;
  }

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
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source src="/assets/video/aminohara92_7389095414512749830.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="preview-section">
          <p className="preview-text">
            Tobbihub is a free movies <br />
            streaming site with zero ads.
          </p>
          <p className="preview-text">
            We let you watch movies <br />online without having to <br />register
            or paying, <br />with over 10000 movies <br />and TV-Series.
          </p>
          <p className="watch-now">
            <a href="/movies">watch now</a>
          </p>
        </div>
        <h1>New Release</h1>
        <section className="movie-section border" id="new-release">
          {displayMovies(initialMovies.slice(0, 12), 'new-release')}
        </section>
        <h1>Latest Movies</h1>
        <section className="movie-section border" id="latest-movies">
          {displayMovies(initialMovies.slice(12), 'latest-movies')}
        </section>
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

export default App;