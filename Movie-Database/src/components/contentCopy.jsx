import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../api";
import backgroundImage from "../images/background.jpg";
import backgroundImage1 from "../images/pexels-photo.jpeg";

function Content() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({});

  // const [Error, setError] = useState("");

  const searchHandler = () => {
    if (!searchValue) {
      return;
    }
    axios({
      method: "GET",
      url: `http://www.omdbapi.com/?t=${searchValue}&&apiKey=${API_KEY}`,
    })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // setError(error.Error);
        console.log(error);
      });
    setSearchValue("");
  };
  return (
    <>
      <div
        className="h-screen bg-slate-700 w-full bg-no-repeat "
        style={{
          backgroundImage: `url(${backgroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="w-full flex items-center justify-center pt-8">
          <input
            type="text"
            placeholder="Type A Movie Name..."
            className="text-[19px] mr-4 outline-none rounded-xl p-3 w-[40%]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="border border-white rounded-md p-3 font-bold text-white hover:bg-slate-500 w-[140px]"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
        {data.length > 0 && (
          <div className="mt-10 w-full items-center flex justify-center text-white font-bold gap-9 ">
            <div>
              <img
                src={data.Poster}
                alt={data.Title}
                className="border border-white rounded-lg ml-4"
              />
            </div>
            <div className="w-full p-6">
              <h1>Title : {data.Title}</h1>
              <p>Director : {data.Director}</p>
              <p>Country : {data.Country}</p>
              <p>Genre : {data.Genre}</p>
              <p>Language : {data.Language}</p>
              <p>Director : {data.Director}</p>
              <p>Plot : {data.Plot}</p>
              <p>Actors : {data.Actors}</p>
              <p>Rating : {data.imdbRating}</p>
              <p>Year : {data.Year}</p>
              <p>Released : {data.Released}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
