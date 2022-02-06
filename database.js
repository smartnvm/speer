const bcrypt = require('bcrypt');

// mongo dB client/connection setup
// const dbo = require('./db/dbConn')
// dbo.connectToServer(function (err) {
//   if (err) console.log(chalk.red(err));
// })



exports.getUserWithEmail = async function (username, database) {
  // pool = dbo.getDb()

  console.log('--------------[database: search for ]--------\n', username)
  // console.log(database)
  return database
    .collection("users")
    .find({ username: 'aj@smartnvm.com' })
    .toArray((err, dbRes) => {
      if (err) throw err;
      const user = dbRes[0]
      return user
    })

};
