/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config();

const { DB_URL, TEST_DB_URL, DEV_DB_URL } = process.env;
module.exports = {
  development: {
    url: DEV_DB_URL,
  },
  test: {
    url: TEST_DB_URL,
  },
  production: {
    url: DB_URL,
  },
};
