import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../api";
import Header from "./Header";
import backgroundImage4 from "../images/movieimg.avif";

function Content() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchHandler = () => {
    if (!searchValue.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");

    axios({
      method: "GET",
      url: `https://www.omdbapi.com/?s=${searchValue}&apiKey=${API_KEY}`,
    })
      .then((response) => {
        if (response.data.Response === "False") {
          setError(response.data.Error);
          setData(null);
        } else {
          setData(response.data.Search);
        }
      })
      .catch(() => {
        setError("An error occurred while fetching data.");
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });

    setSearchValue("");
  };

  const viewDetailsHandler = (imdbID) => {
    setLoading(true);
    axios({
      method: "GET",
      url: `https://www.omdbapi.com/?i=${imdbID}&apiKey=${API_KEY}`,
    })
      .then((response) => {
        if (response.data.Response === "False") {
          setError(response.data.Error);
          setSelectedMovie(null);
        } else {
          setSelectedMovie(response.data);
        }
      })
      .catch(() => {
        setError("An error occurred while fetching movie details.");
        setSelectedMovie(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const goBackHandler = () => {
    setSelectedMovie(null);
    setError("");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-navy-900 via-gray-900 to-navy-900 text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImage4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header Section */}
      <Header />

      {/* Search Section */}
      {!selectedMovie && (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-8 bg-navy-800 bg-opacity-80 rounded-lg shadow-2xl backdrop-blur-lg border border-gold-500/20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gold-400 mb-6 text-center font-cinematic">
            Search for Your Favorite Movies
          </h1>
          <input
            type="text"
            placeholder="Type A Movie Name..."
            className="text-lg sm:text-xl mb-4 outline-none rounded-full p-4 w-full sm:w-[80%] md:w-[40%] bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all border-2 border-gray-700"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchHandler()}
          />
          <button
            className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-gold-500/25"
            onClick={searchHandler}
          >
            Search Movies
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-400 font-bold mt-4 text-sm sm:text-base bg-navy-800 bg-opacity-80 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-gold-400 font-bold mt-4 text-sm sm:text-base bg-navy-800 bg-opacity-80 p-4 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-400 mr-3"></div>
            Loading...
          </div>
        </div>
      )}

      {/* Movies List */}
      {!selectedMovie && data && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 px-4 sm:px-8 w-full max-w-7xl">
          {data.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-xl text-center hover:scale-105 transition-transform duration-300 border border-gold-500/10 hover:border-gold-500/30"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg"
              />
              <h2 className="text-lg font-bold text-gold-300 mb-2 line-clamp-2">
                {movie.Title}
              </h2>
              <p className="text-gray-300 mb-4">Year: {movie.Year}</p>
              <button
                className="bg-gold-500 text-navy-900 font-semibold py-2 px-4 rounded-lg hover:bg-gold-400 transition-colors w-full"
                onClick={() => viewDetailsHandler(movie.imdbID)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Movie Details View */}
      {selectedMovie && !loading && (
        <div className="mt-12 w-full flex flex-col items-center text-white font-medium px-4 sm:px-8">
          <div className="w-full max-w-4xl bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-2xl border border-gold-500/20">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src={
                    selectedMovie.Poster !== "N/A"
                      ? selectedMovie.Poster
                      : "placeholder.jpg"
                  }
                  alt={selectedMovie.Title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gold-300 mb-4 font-cinematic">
                  {selectedMovie.Title}
                </h1>
                <div className="space-y-3">
                  <p className="mb-2">
                    <span className="font-bold text-gold-200">Year:</span>{" "}
                    <span className="text-gray-200">{selectedMovie.Year}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-gold-200">Director:</span>{" "}
                    <span className="text-gray-200">
                      {selectedMovie.Director}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-gold-200">Genre:</span>{" "}
                    <span className="text-gray-200">{selectedMovie.Genre}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-gold-200">Rating:</span>{" "}
                    <span className="text-gray-200">
                      {selectedMovie.imdbRating}/10
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-gold-200">Actors:</span>{" "}
                    <span className="text-gray-200">
                      {selectedMovie.Actors}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-bold text-gold-200">Plot:</span>{" "}
                    <span className="text-gray-200">{selectedMovie.Plot}</span>
                  </p>
                </div>
                <button
                  className="bg-gold-500 text-navy-900 font-bold py-3 px-8 rounded-lg hover:bg-gold-400 transition-colors mt-4"
                  onClick={goBackHandler}
                >
                  ← Back to Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
