const express = require("express");
const router = express.Router();
const axios = require("axios");
const { BASE_URL } = require("../constants/baseUrl");

router.get("/search", async (req, res) => {
  const { query, page = 1 } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.API_KEY,
        query: query,
        page: page
      }
    });
    res.json(response.data);
  } catch (err) {
    res.send(err.message).status(404);
  }
});

router.get("/trailer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: process.env.API_KEY
      }
    });
    res.json(response.data);
  } catch (err) {
    res.send("no trailers").status(404);
  }
});

module.exports = router;
