import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// console.log();

//Configure dotenv
if (process.env.NODE_ENV !== 'production') dotenv.config();

// let dbUrl: string;
let DB_URL: string;
let sequelize: Sequelize;

if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL as string;
} else if (process.env.NODE_ENV === 'development') {
  DB_URL = process.env.DEV_DB_URL as string;
} else {
  DB_URL = process.env.DB_URL as string;
}

// Creating an instance of Sequelize
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // This disables logging 😌 🎉
  });
} else {
  sequelize = new Sequelize(DB_URL, {
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
}

const sequelizeConnection = async () => {
  try {
    // connect to the db
    sequelize.authenticate().then(() => {
      const db = sequelize.getDatabaseName();
      console.log(`🍏 Successfully connected to the db 🔥${db}🔥`);
    });
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
export { sequelize };
export default sequelizeConnection;
