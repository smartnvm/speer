
const bcrypt = require('bcrypt')

const testUsersdB = require("../db/test_data/users/users");

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
    authenticateUser(username, password, testUsersdB)
      .then(auth => {
        console.log('------[auth?]---------', auth)
        return res.json({ auth });
      })
  });

  router.post("/register", (req, res) => {
    res.json({ cod: 200, POST: '/register' });
  });


  return router;
};

