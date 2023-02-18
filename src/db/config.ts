import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

//Configure dotenv
if (process.env.NODE_ENV !== 'production') dotenv.config();

// let dbUrl: string;
let DB_URL: string;
let dbName: string;

if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL as string;
  dbName = process.env.DB_NAME as string;
} else {
  DB_URL = process.env.DB_URL as string;
  dbName = process.env.DB_NAME as string;
}

//Creating an instance of Sequelize
export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // This disables logging 😌 🎉
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const sequelizeConnection = async () => {
  try {
    // connect to the db
    sequelize
      .authenticate()
      .then(() =>
        console.log(`🍏 Successfully connected to the db 🔥${dbName}🔥`)
      );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `🍎 Error occurred when connecting to the db: ${error.message}`
      );
    } else {
      console.log('🍎 Unexpected error', error);
    }
  }
};

export default sequelizeConnection;
