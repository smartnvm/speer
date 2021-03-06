const cookieParser      = require('cookie-parser');
const bodyParser = require("body-parser");
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
  if (err) console.log(chalk.red(err));
})

const usersRoutes = require("./routes/usersRoutes");
const tweetsRoutes = require("./routes/tweetsRoutes");
const debugRoutes = require("./routes/debugRoutes");

module.exports = function application(API) {

  app.use(session({
    name: 'session', keys: ['Howdy! Hello World'],
    maxAge: 24 * 60 * 60 * 1000
  }));


  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', usersRoutes(router, dbo));
  app.use('/api/tweets', tweetsRoutes(router, dbo));
  app.use('/api/debug', debugRoutes(router, dbo, API));

  app.get("/", (req, res) => {
    res.json({
      msg: 'hello world',
      api: 'tweet',
      description: 'twitter like with user Authentication / Register and Tweets CRUD for a list of api endpoints please visit info URL Please note, a user must be logged or a new user can sign up to access the API:)',
      testUser: { username: 'aj@smartnvm.com', password: 'password' },
      info: 'http://tweet.smartnvm.com/api/debug/help',
      github: 'https://github.com/smartnvm/speer',

    });
  });

  app.close = () => {
    return dbo.end();
  };

  return app;
}

