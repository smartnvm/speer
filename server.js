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

//dev dependency
const morgan = require("morgan");

// change PORT in .env file
const PORT = process.env.PORT || 8000;
const API_NAME = process.env.API_NAME;
const API_VERSION = process.env.API_VERSION;

const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const  data = {
   msg: 'hello world!'
  }
  res.json({ api: API_NAME, version: API_VERSION, data })
});


app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`)
})


