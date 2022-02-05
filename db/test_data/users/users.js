//seed data
const usersdB = require('../../seed/users/users');

//convert array of objects to object of objects
//simplifies user search for testing
const usersObj = {}

for (const user of usersdB) {
  usersObj[user.username] = user
}

module.exports = usersObj

