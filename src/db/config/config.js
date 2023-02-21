/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

require('dotenv').config();
console.log(process.env.DEV_DB_URL);
module.exports = {
  development: {
    url: process.env.DEV_DB_URL,
  },
  test: {
    url: process.env.TEST_DB_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    url: process.env.DB_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
