import React, { useState, useEffect } from "react";
import axios from './axios';
import requests from './requests';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import "./Banner.css";

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Banner() {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  const handlePlay = () => {
    if (!movie) return;
    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => {
        console.error("Trailer not found", error);
        setTrailerUrl("");
      });
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );

      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
