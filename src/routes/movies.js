const express = require("express");
const router = express.Router();
const axios = require("axios");
const { BASE_URL } = require("../constants/baseUrl");
const mapMovies = require("../helper/mapMovies");

const ctrl = require("../Controllers/movie.controller");


router.get("/search", ctrl.searchMovies);

router.get("/trailers/:id", ctrl.searchTrailers);

router.get("/current_movies", ctrl.searchCurrentMovies);

router.get("/popular_movies", ctrl.searchPopularMovies);

router.get("/:id/movie_review", ctrl.searchMovieReview);

router.get("/movie_info/:id", ctrl.searchMovieInfo);

router.get("/movie_cast/:id", ctrl.searchMovieCast);

module.exports = router;
