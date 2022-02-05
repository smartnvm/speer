
const dbParams = {
  PORT : Number(process.env.DB_PORT),
  DB_NAME : process.env.DB_NAME,
  DB_USER : process.env.DB_USER,
  DB_PASS : process.env.DB_PASS
}

module.exports = {dbParams}

