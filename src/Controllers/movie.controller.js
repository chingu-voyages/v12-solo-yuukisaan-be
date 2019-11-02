const { BASE_URL } = require("../constants/baseUrl");
const axios = require("axios");
const express = require("express");
const mapMovies = require("../helper/mapMovies");


const searchMovies = async (req, res, next) => {
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
};


const searchTrailers = async (req, res, next) => {
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
        youtube: `https://www.youtube.com/embed/${key}`
      };
    })

    res.json(newMovies);
  } catch (err) {
    next(err.response.data);
  }
};

const searchCurrentMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: process.env.API_KEY,
        page
      }
    });
    const movies = mapMovies(response.data.results);
    res.json(movies);
  } catch (err) {
    next(err.response.data);
  }
}

const searchPopularMovies = async (req, res, next) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    const movies = mapMovies(response.data.results);
    res.json(movies);

  } catch (err) {
    next(err.response.data);
  }
}

const searchMovieReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
      params: {
        api_key: process.env.API_KEY
      }
    })
    res.json(response.data.results);
  } catch (err) {
    next(err.response);
  }
}

const searchMovieInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    const { backdrop_path, genres, poster_path, overview, release_date, production_companies, original_title
      , runtime, production_countries, vote_count
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
}

const searchMovieCast = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    const movieCast = response.data.cast.filter(data => {
      return data.profile_path;
    }).map(data => {
      const { character, name, profile_path } = data;
      return {
        profile_image: `https://image.tmdb.org/t/p/original/${profile_path}`,
        character,
        name
      }
    })
    res.json(movieCast);
  } catch (err) {
    next(err.response.data);
  }
}



module.exports = {
  searchMovies,
  searchTrailers,
  searchCurrentMovies,
  searchPopularMovies,
  searchMovieReview,
  searchMovieInfo,
  searchMovieCast
}