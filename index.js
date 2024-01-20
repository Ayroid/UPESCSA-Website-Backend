// MODULES IMPORT
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { StatusCodes } = require("http-status-codes");

// CONSTANTS
const PORT = process.env.PORT || 3000;

// INTIALIZING EXPRESS
const app = express();

// SETTING UP BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SETTING UP CORS
app.use(cors());

// STARTING SERVER

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ✅`);
  });