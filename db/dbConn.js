require('dotenv').config();
const chalk = require('chalk');

const {PORT, DB_NAME, DB_USER, DB_PASS } = require('./dbParams').dbParams


const { MongoClient } = require("mongodb");
// const conUrl = process.env.ATLAS_URI;
// const conUrl = `mongodb://${DB_USER}:${DB_PASS}@localhost:${PORT}/${DB_NAME}`
const conUrl = `mongodb://localhost:${PORT}/${DB_NAME}`

// console.log(chalk.yellow(`----[connecting to db]---`));
// console.log({  DB_NAME, PORT, DB_USER, conUrl })

const client = new MongoClient(conUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbo;
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) return callback(err);

      dbo = db.db(DB_NAME);
      // console.log(chalk.green("Successfully connected to MongoDB."));
      return callback();
    });

  },

  end: function () {
    client.close()
  },

  getDb: function () {
    return dbo;
  },

};
