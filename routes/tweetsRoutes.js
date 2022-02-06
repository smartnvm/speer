
const tweetsdB = require("../db/seed/tweets/tweets");

const tweets = require("../db/test_data/tweets/tweets");
const db = require('../database');

console.log(tweets)
const { authenticateUser, createUser } = require('../utils/usersUtil')


module.exports = (router, dbo) => {

  //create a new tweet
  router.post("/new", (req, res) => {
    //check if we are already logged in
    const authorId = req.session.userid;
    if (!authorId) {
      return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
    }

    const tweet = { ...req.body, authorId, timestamp: new Date(Date.now()) }
    const database = dbo.getDb()

    database.collection("tweets").insertOne(tweet);
    res.json({ cod: 200, tweet });

  });


  //get user's tweets
  router.get("/", (req, res) => {
    //check if we are already logged in
    const authorId = req.session.userid;
    if (!authorId) {
      return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
    }

    const database = dbo.getDb()

    database.collection("tweets").find({ authorId })
      .toArray((err, tweets) => {
        if (err) throw err;
        res.json({ cod: 20,  count:tweets.length, tweets });
      })

  });




  return router;
};
