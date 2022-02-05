/**************
 * Application: Speer Technologies Challenge
 * Project: Twitter Clone
 * Author: AJ Alshehabi
 * github:
 *
 */

// load .env data into process.env
require("dotenv").config();

const express = require("express");
const app = express();

const router = express.Router();

//dev dependency
const morgan = require("morgan");

// change PORT in .env file
const PORT = process.env.PORT || 8000;
const API_NAME = process.env.API_NAME;
const API_VERSION = process.env.API_VERSION;


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./routes/usersRoutes");
app.use('/api', usersRoutes(router));

app.get("/", (req, res) => {
  const endpoints = {
    1: { method: 'GET', route: '/api/login', description: 'check for logged user' },
    2: { method: 'POST', route: '/api/login', description: 'user login authentication' },
    3: { method: 'GET', route: '/api/register', description: 'new user registeration form' },
    4: { method: 'POST', route: '/api/register', description: 'register new user' },
  };
  res.json({ api: API_NAME, version: API_VERSION, endpoints });
});


app.listen(PORT, () => {
  console.log(`😎 Hello! Server running on ${PORT}`);
});
