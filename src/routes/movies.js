const express = require("express");
const router = express.Router();
const axios = require("axios");
const { BASE_URL } = require("../constants/baseUrl");
const mapMovies = require("../helper/mapMovies");

router.get("/search", async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;

    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.API_KEY,
        query: query,
        page: page
      }
    });
    const movies = mapMovies(response.data.results);
    res.json(movies);
  } catch (err) {
    next(err.response.data);
  }
});

router.get("/trailers/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    const newMovies = response.data.results.map(movie => {
      const { name, key } = movie;
      return {
        name,
        youtube: `https://www.youtube.com/watch?v=${key}`
      };
    });
    res.json(newMovies);
  } catch (err) {
    next(err.response.data);
  }
});

router.get("/current_movies", async (req, res, next) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    const movies = mapMovies(response.data.results);
    res.json(movies);
  } catch (err) {
    next(err.response.data);
  }
});


router.get("/movie_info/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    const { backdrop_path, genres, poster_path, overview, release_date, production_companies, original_title
    ,runtime ,  production_countries, vote_count
    } = response.data
    const newResponse = {
      poster: {
        backdrop: `http://image.tmdb.org/t/p/original/${backdrop_path}`,
        poster: `http://image.tmdb.org/t/p/w185/${poster_path}`
      },
      genres,
      overview,
      release_date,
      original_title,
      production_companies,
      production_countries,
      runtime,
      vote_count
    }
    res.json(newResponse);
  } catch (err) {
    next(err.response.data);
  }
})

module.exports = router;
