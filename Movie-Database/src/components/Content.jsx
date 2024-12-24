import React, { useState } from "react";
import axios from "axios";
//import { API_KEY } from "../api";
import backgroundImage1 from "../images/pexels-photo.jpeg";
import Header from "./Header";
import backgroundImage2 from "../images/explorer.webp";

function Content() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
 const API_KEY = "ecbf9630";

  

  const searchHandler = () => {
    if (!searchValue.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true); // Set loading to true before API call
    setError(""); // Clear any previous errors

    axios({
      method: "GET",
      url: `http://www.omdbapi.com/?t=${searchValue}&apiKey=${API_KEY}`,
    })
      .then((response) => {
        if (response.data.Response === "False") {
          setError(response.data.Error); // API error message
          setData(null);
        } else {
          setData(response.data);
        }
      })
      .catch(() => {
        setError("An error occurred while fetching data.");
        setData(null);
      })
      .finally(() => {
        setLoading(false); // Stop loading after the API call is complete
      });

    setSearchValue("");
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

      {/* Movie Data Display */}
      {data && !loading && (
        <div className="mt-12 w-full flex flex-col md:flex-row items-center justify-center text-white font-medium gap-8 px-4 sm:px-8">
          {/* Movie Poster */}
          <div className="w-full md:w-auto">
            <img
              src={data.Poster}
              alt={data.Title}
              className="border border-gray-700 rounded-lg max-w-[80%] md:max-w-none sm:w-[70%] md:w-auto mx-auto shadow-lg transform hover:scale-105 transition-transform"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-[60%] p-6 text-sm sm:text-base md:text-lg bg-black bg-opacity-70 rounded-xl shadow-xl backdrop-blur-lg">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400">
              {data.Title}
            </h1>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Director:</span>{" "}
              {data.Director}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Country:</span>{" "}
              {data.Country}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Genre:</span>{" "}
              {data.Genre}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Language:</span>{" "}
              {data.Language}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Plot:</span> {data.Plot}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Actors:</span>{" "}
              {data.Actors}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Rating:</span>{" "}
              {data.imdbRating}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Year:</span> {data.Year}
            </p>
            <p className="mb-2">
              <span className="font-bold text-gray-300">Released:</span>{" "}
              {data.Released}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
