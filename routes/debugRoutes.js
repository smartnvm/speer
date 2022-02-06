const testUsers = require('../db/seed/users/users')
const tweets = require('../db/seed/tweets/tweets')

module.exports = (router, dbo, API) => {

  router.get("/help", (req, res) => {
    const data = {
      api: API.NAME,
      version: API.VERSION,
      published: '2022-02-06T16:37:52.064Z',

      author: {
        name: 'AJ',
        email: 'aj@smartnvm.com',
        stack: "MERN",
      },

      endpoints: {
        users: {

          1: { method: 'GET', route: '/api/login', description: 'check for logged user' },
          2: { method: 'POST', route: '/api/login', description: 'user login authentication' },
          3: { method: 'POST', route: '/api/register', description: 'register new user' },
        },

        tweets: {
          1: { method: 'POST', route: '/api/tweets', description: 'creat tweet' },
          2: { method: 'GET', route: '/api/tweets', description: 'read tweets' },
          3: { method: 'PUT', route: '/api/tweets/:id', description: 'update tweet' },
          4: { method: 'DELETE', route: '/api/tweets/:id', description: 'delete tweet' },

        },

        debug: {
          1: { method: 'GET', route: '/api/debug/help', description: 'this help page' },
          2: { method: 'GET', route: '/api/debug/db_reset', description: 'database auto reset and seed' },
        }
      }
    }
      ;
    res.json( data );
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
      .then(() => {
        res.json({ cod: 200, cmd: 'db_reset', testUsers, tweets })
      })
      .catch(err => {
        console.log(err)
      })
  });


  return router;
};


