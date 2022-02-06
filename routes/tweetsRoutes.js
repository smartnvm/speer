const { ObjectId } = require("bson");

const tweetsdB = require("../db/seed/tweets/tweets");

const tweets = require("../db/test_data/tweets/tweets");
const db = require('../database');

module.exports = (router, dbo) => {

  //Create: post a new tweet
  router.post("/new", (req, res) => {
    //check if we are already logged in
    const userId = req.session.userid;
    console.log('-----cookie session-------', userId)
    const { author, body } = req.body
    const authorId = userId
    if (!userId) {
      return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
    }

    const tweet = { author, body, authorId, archive: false, timestamp: new Date(Date.now()) }
    const database = dbo.getDb()

    database.collection("tweets").insertOne(tweet);
    res.json({ cod: 200, tweet });

  });


  //Read: get user's tweets
  router.get("/", (req, res) => {
    //check if we are already logged in
    const authorId = req.session.userid;
    if (!authorId) {
      return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
    }

    const database = dbo.getDb()
    // to fetch only logged user's specific tweets
    // database.collection("tweets").find({ $and: [{ archive: { $eq: false } }, { authorId: authorId }] })

    //opting to show tweets from all users
    database.collection("tweets").find( { archive: { $eq: false } })
    .toArray((err, tweets) => {
      if (err) throw err;
      res.json({ cod: 200, count: tweets.length, tweets });
    })

});

//Update: user's tweet
router.put("/:id", (req, res) => {
  const tweetId = req.params.id
  const { author, body } = req.body

  console.log('------------------------------')
  console.log(tweetId, body)
  console.log('------------------------------')

  //check if we are already logged in
  const authorId = req.session.userid;
  if (!authorId) {
    return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
  }

  const database = dbo.getDb()
  const tweet = { body, timestamp: new Date(Date.now()) }

  database.collection("tweets").findOneAndUpdate(
    { _id: ObjectId(tweetId) },
    { $set: { ...tweet } })
    .then( newTweet => {
      res.json({ cod: 200, tweet:newTweet.value });
    })
    .catch(err => console.log(err))

});

//Delete: user tweet
router.delete('/:id/', (req, res) => {

  const id = req.params.id

  //check if we are already logged in
  const userId = req.session.userid;
  if (!userId) {
    return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
  }

  const database = dbo.getDb();

  //opting to archive tweets as opposed to hard delete
  database.collection("tweets").findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { archive: true } },
    { returnOriginal: false })
    .then(tweet => {
      const dbRes = tweet.value
      console.log({ tweet: dbRes, cod: dbRes ? 200 : 400, msg: dbRes ? 'deleted' : 'not found' })
      dbRes ?
        res.json({  cod: 200, msg: 'Tweet deleted!' }) :
        res.json({  cod: 400, msg: 'Tweet not found' })
    })
    .catch(err => console.log(err))

})





return router;
};
