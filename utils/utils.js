
const bcrypt = require('bcrypt')

async function authenticateUser(password, user) {
  if (user) {
    const hashMatch = await bcrypt.compare(password, user.hash);
    const match = password === user.password
    return match;
  }
  return false;
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

async function createUser(username, password) {
  const hash = await hashPassword(password);
  const user = { username, hash, };
  return user;
}

module.exports =  {authenticateUser ,createUser}
