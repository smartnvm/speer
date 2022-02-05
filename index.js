/**************
 * Application: Speer Technologies Challenge
 * Project: Twitter Clone
 * Author: AJ Alshehabi
 * github:
 *
 */

// load .env data into process.env
require("dotenv").config();

const chalk = require('chalk');

// change PORT in .env file
const PORT = process.env.PORT || 9002;
const NAME = process.env.API_NAME;
const VERSION = process.env.API_VERSION;

const API = {NAME, VERSION}

const app = require("./application")(API);

app.listen(PORT, () => {
  console.log(chalk.yellow(`😎 Hello! Server running on`), `${PORT}`);
});

