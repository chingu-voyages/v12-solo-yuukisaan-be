const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const moviesRoute = require("./routes/movies");

app.use(express.json());
app.use(cors());
app.use("/movies",moviesRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
