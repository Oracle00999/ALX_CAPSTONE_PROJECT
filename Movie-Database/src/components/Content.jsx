import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../api";
import Header from "./Header";
import backgroundImage2 from "../images/explorer.webp";

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
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header Section */}
      <Header />

      {/* Search Section */}
      {!selectedMovie && (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-8 bg-black bg-opacity-60 rounded-lg shadow-lg backdrop-blur-lg">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-6 text-center">
            Search for Your Favorite Movies
          </h1>
          <input
            type="text"
            placeholder="Type A Movie Name..."
            className="text-lg sm:text-xl mb-4 outline-none rounded-full p-4 w-full sm:w-[80%] md:w-[40%] bg-gray-800 text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500 transition-all"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 font-bold mt-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-gray-400 font-bold mt-4 text-sm sm:text-base">
          Loading...
        </div>
      )}

      {/* Movies List */}
      {!selectedMovie && data && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 px-4 sm:px-8">
          {data.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-black bg-opacity-70 p-4 rounded-lg shadow-lg text-center hover:scale-105 transition-transform"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold text-blue-400 mb-2">
                {movie.Title}
              </h2>
              <p className="text-gray-300 mb-2">Year: {movie.Year}</p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
          <div className="w-full max-w-3xl bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold text-blue-400 mb-4">
              {selectedMovie.Title}
            </h1>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Director:</span>{" "}
              {selectedMovie.Director}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Genre:</span>{" "}
              {selectedMovie.Genre}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Plot:</span>{" "}
              {selectedMovie.Plot}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Actors:</span>{" "}
              {selectedMovie.Actors}
            </p>
            <button
              className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              onClick={goBackHandler}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
