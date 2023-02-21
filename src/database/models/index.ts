/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// * This is just a way to get the console.log to work with the ANSI escape codes
// * to make the environment, and the db you are connected to stand out in the console.
const message = '\x1B[41;93;4m🛖🏠Environment = ';
const message2 = '\x1B[92;102;4m🏦🎰URL = ';
const environment = `\x1B[34;44;4m${env}\x1B[m`;
const url = `\x1B[36;46;4m${config.url}\x1B[m`;
console.log(message + environment);
console.log(message2 + url);
// * But it's not necessary.

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

// *********************************************************************************************************************

// export all models from one file to keep the code clean
// export * from './Cart.model';
// export * from './LoggedInUsers.model';
// export * from './Product.model';
// export * from './Token.model';
// export * from './User.model';
// *********************************************************************************************************************
