const express = require("express");
     const cors = require("cors");
     const path = require("path");
     const dotenv = require("dotenv");
     const axios = require("axios");

     dotenv.config();
     const app = express();

     app.use(cors());
     app.use(express.json());
     app.use(express.static(path.join(__dirname, "public")));

     // Load API routes safely
     let apiRouter;
     try {
       apiRouter = require("./routes/api");
       app.use("/api", apiRouter);
     } catch (error) {
       console.error("Error loading routes/api.js:", error.message);
     }

     // External HTML search page
     app.get("/search", async (req, res) => {
       try {
         const { query } = req.query;
         let movies = [];
         let error = "";

         if (query) {
           const response = await axios.get(
             `http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${
               process.env.OMDB_API_KEY
             }`
           );
           if (response.data.Search) {
             movies = response.data.Search;
           } else {
             error = response.data.Error || "No movies found";
           }
         }

         res.send(`
           <!DOCTYPE html>
           <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Search Results - Tobbihub</title>
             <link rel="stylesheet" href="/styles.css">
           </head>
           <body>
             <header>
               <div class="logo-container">
                 <a href="/"><img src="/assets/logo/logo-removebg-preview.png" class="logo" alt="Logo"></a>
               </div>
             </header>
             <main>
               <form action="/search" method="GET" class="search-box">
                 <input class="input-search" type="text" name="query" value="${query || ''}" placeholder="Search movies...">
                 <button type="submit">Search</button>
               </form>
               <h1>Search Results</h1>
               ${error ? `<p class="error">${error}</p>` : ""}
               <section class="movie-section">
                 ${movies
                   .map(
                     (movie) => `
                       <div class="movie-card" key="${movie.imdbID}">
                         <div class="img-card">
                           ${
                             movie.Poster !== "N/A"
                               ? `<img class="card" src="${movie.Poster}" alt="${movie.Title}">`
                               : "<p>No poster available</p>"
                           }
                         </div>
                         <div class="title-info">
                           <p class="movie-title">${movie.Title}</p>
                           <p class="movie-info">${movie.Year}</p>
                           <button class="movie-btn">${movie.Type}</button>
                         </div>
                       </div>
                     `
                   )
                   .join("")}
               </section>
             </main>
           </body>
           </html>
         `);
       } catch (error) {
         console.error("Error in /search route:", error.message);
         res.status(500).send(`
           <!DOCTYPE html>
           <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Error - Tobbihub</title>
             <link rel="stylesheet" href="/styles.css">
           </head>
           <body>
             <h1>Error</h1>
             <p>Failed to load search results. Please try again.</p>
             <a href="/search">Back to Search</a>
           </body>
           </html>
         `);
       }
     });

     // Serve React app for all other routes
     app.use(express.static(path.join(__dirname, "../tobbihub/dist")));
     app.get("*", (req, res) => {
       res.sendFile(path.join(__dirname, "../tobbihub/dist", "index.html"), (err) => {
         if (err) {
           console.error("Error serving index.html:", err.message);
           res.status(500).send("Server error: Unable to load the application");
         }
       });
     });

     // Debug routes
     console.log("Registered routes:");
     if (app._router && app._router.stack) {
       app._router.stack.forEach((layer) => {
         if (layer.route) {
           console.log("Route:", layer.route.path);
         } else if (layer.name === "router" && layer.regexp) {
           console.log("Router:", layer.regexp);
         }
       });
     } else {
       console.log("No router stack available");
     }

     // Error handler for invalid routes
     app.use((err, req, res, next) => {
       console.error("Express error:", err.message, err.stack);
       res.status(500).send("Something broke!");
     });

     const PORT = process.env.PORT || 3001;
     app.listen(PORT, () => {
       console.log(`Server running at http://localhost:${PORT}`);
     });