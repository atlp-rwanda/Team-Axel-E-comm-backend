/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// * This is just a way to get the console.log to work with the ANSI escape codes
const message = '\x1B[41;93;4m🛖🏠Environment = ';
const message2 = '\x1B[92;102;4m🏦🎰URL = ';
const environment = `\x1B[34;44;4m${env}\x1B[m`;
const url = `\x1B[36;46;4m${config.url}\x1B[m`;
console.log(message + environment);
console.log(message2 + url);
// * So that the environment stands out in the console

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

// *********************************************************************************************************************

// import fs from 'fs';
// import path from 'path';
// import { Sequelize, DataTypes } from 'sequelize';
// import envConfigs from '../config/config';
// // import { SequelizeModel } from './types';

// const env = process.env.NODE_ENV || 'development';
// const config = envConfigs[env];
// const db: Record<string, any> = {};
// let sequelize: Sequelize;

// if (config.url) {
//   sequelize = new Sequelize(config.url, config);
// } else {
//   sequelize = new Sequelize(
//     // config.database,
//     // config.username,
//     // config.password,
//     config.url,
//     config,
//     {
//       logging: false,
//     }
//   );
// }

// fs.readdirSync(__dirname)
//   .filter(
//     (file) =>
//       file.indexOf('.') !== 0 &&
//       file !== 'index.ts' &&
//       file.slice(-3) === '.model.ts'
//   )
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file)).default(
//       sequelize,
//       DataTypes
//     ) as any;
//     db[model.name] = model;
//   });

// Object.values(db)
//   .filter((model) => typeof model.associate === 'function')
//   .forEach((model) => model.associate(db));

// const dbInstance = {
//   sequelize,
//   Sequelize,
//   models: db,
// };

// export default dbInstance;

// *********************************************************************************************************************
// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';

// //Configure dotenv
// if (process.env.NODE_ENV !== 'production') dotenv.config();

// // let dbUrl: string;
// let DB_URL: string;
// let sequelize: Sequelize;

// if (process.env.NODE_ENV === 'test') {
//   DB_URL = process.env.TEST_DB_URL as string;
// } else if (process.env.NODE_ENV === 'development') {
//   DB_URL = process.env.DEV_DB_URL as string;
// } else {
//   DB_URL = process.env.DB_URL as string;
// }

// // Creating an instance of Sequelize
// if (process.env.NODE_ENV === 'development') {
//   sequelize = new Sequelize(DB_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     logging: false, // This disables logging 😌 🎉
//   });
// } else {
//   sequelize = new Sequelize(DB_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     logging: false, // This disables logging 😌 🎉
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });
// }

// const dbInstance = async () => {
//   try {
//     // connect to the db
//     sequelize.authenticate().then(() => {
//       const databaseName = sequelize.getDatabaseName();
//       console.log(`🍏 Successfully connected to the db 🔥${databaseName}🔥`);
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(
//         `🍎 Error occurred when connecting to the db: ${error.message}`
//       );
//     } else {
//       console.log('🍎 Unexpected error', error);
//     }
//   }
// };
// export { sequelize };
// export default dbInstance;
