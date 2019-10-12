const express = require("express");
const router = express.Router();
const axios = require("axios");
const { BASE_URL } = require("../constants/baseUrl");

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
    res.json(response.data);
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
      const {name, key} = movie;
      return {
        name,
        youtube: `https://www.youtube.com/watch?v=${key}`
      }
    })
    res.json(newMovies);
  } catch (err) {
    next(err.response.data);
  }
});

module.exports = router;
