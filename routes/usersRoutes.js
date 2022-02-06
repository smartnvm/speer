
const testUsersdB = require("../db/test_data/users/users");
const db = require('../database');

const {authenticateUser , createUser} = require('../utils/utils')


module.exports = (router, dbo) => {

  router.get("/login", (req, res) => {
    //check if we are already logged in
    const userId = req.session.userid;
    console.log("session username:", userId);
    if (!userId) {
      return res.json({ err: 401, msg: "user not logged in" });
    }
    const user = testUsersdB[userId];
    res.json(user);
  });

  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    const database = dbo.getDb()
    database
      .collection("users")
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

  router.post("/register", (req, res) => {
    const database = dbo.getDb()
    const { username, password } = req.body;

    console.log(username)

    database
      .collection("users")
      .find({ username })
      .toArray((err, dbRes) => {
        if (err) throw err;
        const user = dbRes[0]
        if (user) {
          console.log('error: user already exisit')
          res.json({ cod: 400, msg: `error user ${user.username} already exists` })
          return
        }

        console.log({ cod: 200, msg: `Hello, ${username}` })
        createUser(username, password)
          .then(newUser => {
            database.collection("users").insertOne(newUser);
            console.log('.......create user.........\n', newUser);
            res.json({ code: 200, newUser });
          })
      })
  });



  //test route dB interaction
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
