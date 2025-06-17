import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchResult from './components/SearchResult';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Move displayMovies outside the App component
const displayMovies = (movies) => {
  return movies.map((movie) => (
    <div className="movie-card" key={movie.id}>
      <div className="img-card">
        <img className="card" src={movie.image} alt={movie.title} />
      </div>
      <div className="title-info">
        <p className="movie-title">{movie.title}</p>
        <p className="movie-info">
          {movie.year} • {movie.duration}
        </p>
        <button className="movie-btn">{movie.type}</button>
      </div>
    </div>
  ));
};

const initialMovies = [
  { id: 1, title: "Mickey 17", year: 2025, duration: "137m", type: "movie", image: "/assets/trendingVideos/trending1.jpg" },
  { id: 2, title: "Captain America: The", year: 2025, duration: "115m", type: "movie", image: "/assets/trendingVideos/trending2.jpg" },
  { id: 3, title: "A Working Man", year: 2025, duration: "movie", type: "movie", image: "/assets/trendingVideos/trending3.jpg" },
  { id: 4, title: "Alarum", year: 2025, duration: "95m", type: "movie", image: "/assets/trendingVideos/trending4.jpg" },
  { id: 5, title: "Attack on Titan: THE", year: 2025, duration: "145m", type: "movie", image: "/assets/trendingVideos/trending5.jpg" },
  { id: 6, title: "The Woman in the Yard", year: 2025, duration: "87m", type: "movie", image: "/assets/trendingVideos/trending6.jpg" },
  { id: 7, title: "Absolution", year: 2025, duration: "112m", type: "movie", image: "/assets/trendingVideos/trending7.jpg" },
  { id: 8, title: "Novocaine", year: 2025, duration: "109m", type: "movie", image: "/assets/trendingVideos/trending8.jpg" },
  { id: 9, title: "Black Bag", year: 2025, duration: "94m", type: "movie", image: "/assets/trendingVideos/trending9.jpg" },
  { id: 10, title: "Warfare", year: 2025, duration: "96m", type: "movie", image: "/assets/trendingVideos/trending10.jpg" },
  { id: 11, title: "Better Man", year: 2024, duration: "135m", type: "movie", image: "/assets/trendingVideos/trending11.jpg" },
  { id: 12, title: "A Minecraft Movie", year: 2025, duration: "101m", type: "movie", image: "/assets/trendingVideos/trending12.jpg" },
  { id: 13, title: "Algrafi", year: 2025, duration: "111m", type: "movie", image: "/assets/trendingVideos/trending13.jpg" },
  { id: 14, title: "Both Eyes Open", year: 2025, duration: "", type: "movie", image: "/assets/trendingVideos/trending14.jpg" },
  { id: 15, title: "Bottom of the Water", year: 2025, duration: "83m", type: "movie", image: "/assets/trendingVideos/trending15.jpg" },
  { id: 16, title: "Death of a Unicorn", year: 2025, duration: "107m", type: "movie", image: "/assets/trendingVideos/trending16.jpg" },
  { id: 17, title: "825 Forest Road", year: 2025, duration: "101m", type: "movie", image: "/assets/trendingVideos/trending17.jpg" },
  { id: 18, title: "Fog of War", year: 2025, duration: "89m", type: "movie", image: "/assets/trendingVideos/trending18.jpg" },
  { id: 19, title: "Night of the Zoopocalypse", year: 2025, duration: "92m", type: "movie", image: "/assets/trendingVideos/trending19.jpg" },
  { id: 20, title: "Becoming Led Zeppelin", year: 2025, duration: "122m", type: "movie", image: "/assets/trendingVideos/trending20.jpg" },
  { id: 21, title: "Oscar Wilde About America", year: 2025, duration: "98m", type: "movie", image: "/assets/trendingVideos/trending21.jpg" },
  { id: 22, title: "The Alto Knights", year: 2025, duration: "123m", type: "movie", image: "/assets/trendingVideos/trending22.jpg" },
  { id: 23, title: "Gunslingers", year: 2025, duration: "104m", type: "movie", image: "/assets/trendingVideos/trending23.jpg" },
  { id: 24, title: "Home Sweet Home: Rebirth", year: 2025, duration: "93m", type: "movie", image: "/assets/trendingVideos/trending244.jpg"},
];

const initialMovies2 = [
  {id: 1, title: "Eephus", year: 2025,  duration: "98m", type: "movie", image: ""},
  {id: 2, title: "The Woman in the", year: 2025,  duration: "87m", type: "movie", image: ""},
  {id: 3, title: "The Alto Knights", year: 2025,  duration: "123m", type: "movie", image: ""},
  {id: 4, title: "Gunslingers", year: 2025,  duration: "104m", type: "movie", image: ""},
  {id: 5, title: "Home Sweet Home", year: 2025,  duration: "93m", type: "movie", image: ""},
  {id: 6, title: "Magazine Dreams", year: 2025,  duration: "124m", type: "movie", image: ""},
  {id: 7, title: "Seven Veils", year: 2025,  duration: "107m", type: "movie", image: ""},
  {id: 8, title: "n the Lost Lands", year: 2025,  duration: "102m", type: "movie", image: ""},
  {id: 9, title: "A Working Man", year: 2025,  duration: "116m", type: "movie", image: ""},
  {id: 10, title: "The World Will Tremble", year: 2025,  duration: "109m", type: "movie", image: ""},
  {id: 11, title: "Life is Filled with So..", year: 2025,  duration: "99m", type: "movie", image: ""},
  {id: 12, title: "Lady Like", year: 2025,  duration: "87m", type: "movie", image: ""},
  {id: 13, title: "I Was Octomom: The..", year: 2025,  duration: "90m", type: "movie", image: ""},
  {id: 14, title: "Girls Just Wanna..", year: 2025,  duration: "105m", type: "movie", image: ""},
  {id: 15, title: "A Minecraft Movie", year: 2025,  duration: "101m", type: "movie", image: ""},
  {id: 16, title: "Algrafi", year: 2025,  duration: "111m", type: "movie", image: ""},
  {id: 17, title: "Both Eyes Open", year: 2025,  duration: "", type: "movie", image: ""},
  {id: 18, title: "Bottom of the Water", year: 2025,  duration: "83m", type: "movie", image: ""},
  {id: 19, title: "Death of a Unicorn", year: 2025,  duration: "107m", type: "movie", image: ""},
  {id: 20, title: "825 Forest Road", year: 2025,  duration: "101m", type: "movie", image: ""},
  {id: 21, title: "Fog of War", year: 2025,  duration: "89m", type: "movie", image: ""},
  {id: 22, title: "Night of the Zoopo..", year: 2025,  duration: "92m", type: "movie", image: ""},
  {id: 23, title: "Becoming Led Zeppelin", year: 2025,  duration: "122m", type: "movie", image: ""},
  {id: 24, title: "Oscar Wilde About...", year: 2025,  duration: "98m", type: "movie", image: ""},
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false); // State for genre dropdown

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleGenreDropdown = () => {
    setIsGenreOpen(!isGenreOpen); // Toggle dropdown visibility
  };

  return (
    <div>
      <header>
        <div className="logo-container">
          <a href="http://localhost:5173/">
            <img src="src/assets/logo/logo.png" className="logo" alt="Logo" />
          </a>
        </div>
        <nav id="nav-menu" className={isNavOpen ? 'active' : ''}>
          <ul>
            <li><a href="/">home</a></li>
            <li><a href="/movies">movies</a></li>
            <li><a href="/tv-shows">tv shows</a></li>
            <li className="relative">
              <span
                id="genre-toggle"
                className="cursor-pointer"
                onClick={toggleGenreDropdown}>
                <i className='fa-solid fa-caret-down'></i>
                genres
              </span>
              <div
                className={`genre-dropdown ${isGenreOpen ? 'block' : 'hidden'}`}
                id="genre-dropdown"
              >
                <a href="/genres?action">Action</a>
                <a href="/genres?animation">animation</a>
                <a href="/genres?drama">Drama</a>
                <a href="/genres?comedy">Comedy</a>
                <a href="/genres?horror">Horror</a>

              </div>
            </li>
          </ul>
        </nav>
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              className="input-search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-arrow-right"></i>
          </form>
        </div>
        <div className="hamburger" id="hamburger" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
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
                {displayMovies(initialMovies)}
              </section>
              <h1>Latest movies</h1>
              <section className="movie-section border" id="new-release">
                {displayMovies(initialMovies2)}
              </section>
            </main>
          }
        />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
      <footer>
        <div className="end-info">
          <div className="info-info">
            <div className="logo-container2">
              <a href="http://localhost:5173/">
                <img className="logo2" src="src/assets/logo/logo.png" alt="Logo" />
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