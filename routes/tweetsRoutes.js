
const tweetsdB = require("../db/seed/tweets/tweets");

const tweets = require("../db/test_data/tweets/tweets");
const db = require('../database');

console.log(tweets)
const {authenticateUser , createUser} = require('../utils/usersUtil')


module.exports = (router, dbo) => {

  router.get("/", (req, res) => {
    //check if we are already logged in
    const userId = req.session.userid;
    console.log("session username:", userId);
    if (!userId) {
      return res.json({ cod: 403, msg: "Forbidden! Please login first!" });
    }
    console.log(userId)
    // const tweets = tweets[userId];
    res.json({cod:200, tweetsdB});
  });

  router.post("/post", (req, res) => {
    //check if we are already logged in
    const userId = req.session.userid;
    if (!userId) {
      return res.json({ err: 403, msg: "Forbidden! Please login first!" });
    }

    const { author, body } = req.body;
    const database = dbo.getDb()
    database
      .collection("tweets")
      .find({ username })
      .toArray((err, dbRes) => {
        if (err) throw err;
        const user = dbRes[0]
        if (!user) {
          console.log({ cod: 404, auth: false, msg: `user ${username} not found` })
          res.json({ cod: 404, auth:false, msg: `user ${username} not found` });
          return
        }

        authenticateUser(password, user)
          .then(auth => {
            //create session cookie

            if (!auth) {
              req.session.userid = null
              return res.json({ cod: 403, auth, msg: 'incorrect password' });
            }

            req.session.userid = user._id
            console.log('------[auth?]---------\n', req.session.userid)
            return res.json({ cod: 200, auth, msg: `hello ${user.username}` });
          })
      })

  })




  return router;
};
