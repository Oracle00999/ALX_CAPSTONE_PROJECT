import React, { useState } from "react";
import { API_KEY } from "../api";

function Popular() {
  const [popularMovies, setPopularMovies] = useState([
    // ... your list of popular movies
    "28 Years Later",
    "Red One",
    "Wicked",
    "Kraven the Hunter",
    "Subservience",
    "Gladiator II",
    "Carry-On",
    "Nosferatu",
    "Moana 2",
    "The Lord of the Rings: The War of the Rohirrim",
    "Heretic",
    "The Substance",
    "28 Days Later",
    "Beetlejuice Beetlejuice",
    "That Christmas",
    "Venom: The Last Dance",
    "Conclave",
    "Love Actually",
    "The Brutalist",
    "Dear Santa",
    "Lucky Baskhar",
    "Mary",
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie details

  const handlePopularMovie = (movieTitle) => {
    // Use the movie title from the clicked movie
    axios({
      method: "GET",
      url: `http://www.omdbapi.com/?t=${movieTitle}&apiKey=${API_KEY}`,
    })
      .then((response) => {
        setSelectedMovie(response.data);
      })
      .catch(() => {});
  };

  return (
    <>
      <div>
        {popularMovies.map((movie) => (
          <button key={movie} onClick={() => handlePopularMovie(movie)}>
            {movie}
          </button>
        ))}
      </div>
      {selectedMovie && ( // Conditionally render movie details only if selected
        <div>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          {/* Display other movie details from selectedMovie */}
        </div>
      )}
    </>
  );
}

export default Popular;
