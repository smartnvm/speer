
const testUsers = require("../db/data/users/users");

module.exports = (router, dbo) => {

  router.get("/login", (req, res) => {
    //check if we are already logged in
    const userId ="0";
    console.log("login:", userId);

    if (!userId) return res.json({ err: 401, msg: "user not logged in" });

    const user = testUsers[userId];
    res.json(user);
  });

  router.post("/login", (req, res) => {
    res.json({cod: 200, POST:'/login'});
  });

  router.post("/register", (req, res) => {
    res.json({cod: 200, POST:'/register'});
  });

  router.get("/register", (req, res) => {
    res.json({cod: 200, GET:'/register'});
  });


  return router;
};

