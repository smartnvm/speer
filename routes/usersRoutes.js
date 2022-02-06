
const bcrypt = require('bcrypt')

const testUsersdB = require("../db/test_data/users/users");
const db = require('../database');

async function authenticateUser(username, password, testUsersdB) {
  if (testUsersdB[username]) {
    const hashMatch = await bcrypt.compare(password, testUsersdB[username].hash);
    const match = password === testUsersdB[username].password
    return match;
  }
  return false;
}


module.exports = (router, dbo) => {

  router.get("/login", (req, res) => {
    //check if we are already logged in
    const userId = req.session.username;
    console.log("session username:", userId);
    if (!userId) {
      return res.json({ err: 401, msg: "user not logged in" });
    }
    const user = testUsersdB[userId];
    res.json(user);
  });

  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    return authenticateUser(username, password, testUsersdB)
      .then(auth => {
        auth ? req.session.username = username : req.session.username = null
        console.log('------[auth?]---------\n', req.session.username)
        return res.json({ auth, session: req.session });
      })
  });

  router.post("/register", (req, res) => {
    res.json({ cod: 200, POST: '/register' });
  });


  router.get('/dbtest', (req, res) => {
    const database = dbo.getDb()

    //tried to simplify and refactor out dB logic into database.js
    //not sure why the code below always return undefined
    //spend too much time debugging so reverting back
    //to working spaghetti code :(

    // db.getUserWithEmail('aj@smartnvm.com',database)
    //   .then((dbRes) => {
    //     console.log({dbRes})
    //     res.json({dbRes} )
    //   })


    username = 'aj@smartnvm.com'
    password = 'password'
    database
      .collection("users")
      .find({ username })
      .toArray((err, dbRes) => {
        let user = dbRes[0]
        if (err) throw err;

        if (user) {
          console.log('error: user already exisit')
          return res.json({ cod: 400, msg: `error user ${user.username} already exists` })
        }

       res.json({cod:200, msg:`Hello, ${username}`})
      })

  })
  return router;
};
