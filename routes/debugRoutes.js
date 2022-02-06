const testUsers = require('../db/seed/users/users')
const tweets = require('../db/seed/tweets/tweets')

module.exports = (router, dbo, API) => {

  router.get("/help", (req, res) => {
    const endpoints = {
      // 1: { method: 'GET', route: '/api/login', description: 'check for logged user' },
      2: { method: 'POST', route: '/api/login', description: 'user login authentication' },
      // 3: { method: 'GET', route: '/api/register', description: 'new user registeration form' },
      4: { method: 'POST', route: '/api/register', description: 'register new user' },
    };
    res.json({ api: API.NAME, version: API.VERSION, endpoints });
  });

  router.get("/db_reset", (req, res) => {
    const dbConn = dbo.getDb();
    dbConn.collection("users").deleteMany({})
      .then(() => {
        dbConn.collection("users").insertMany(testUsers)
      })
      .then(() => {
        dbConn.collection("tweets").deleteMany({})
      })
      .then(() => {
        dbConn.collection("tweets").insertMany(tweets)
      })
      .then(()=>{
        res.json({ cod: 200, cmd: 'db_reset', testUsers, tweets })
      })
      .catch(err => {
        console.log(err)
      })
  });


  return router;
};

