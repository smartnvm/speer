const express = require("express");
const app = express();

const router = express.Router();

//dev dependency
const morgan = require("morgan");
const chalk = require('chalk');

const session = require("cookie-session");

// mongo dB client/connection setup
const dbo = require('./db/dbConn')
dbo.connectToServer(function (err) {
  if (err) console.error(chalk.red(err));
})

const usersRoutes = require("./routes/usersRoutes");

module.exports = function application(API) {

  app.use(session({
    name: 'session', keys: ['Howdy! Hello World'],
    maxAge: 24 * 60 * 60 * 1000
  }));

  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', usersRoutes(router));

  app.get("/", (req, res) => {
    res.json({ msg: 'hello world' });
  });

  app.get("/help", (req, res) => {
    const endpoints = {
      1: { method: 'GET', route: '/api/login', description: 'check for logged user' },
      2: { method: 'POST', route: '/api/login', description: 'user login authentication' },
      3: { method: 'GET', route: '/api/register', description: 'new user registeration form' },
      4: { method: 'POST', route: '/api/register', description: 'register new user' },
    };
    res.json({ api: API.NAME, version: API.VERSION, endpoints });
  });

  app.close = () => {
    return dbo.end();
  };

  return app;
}
