import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

//Configure dotenv
if (process.env.NODE_ENV !== 'production') dotenv.config();

// let dbUrl: string;
let dbName: string;
let dbUser: string;
let dbHost: string | undefined;
let dbPassword: string | undefined;

if (process.env.NODE_ENV === 'test') {
  // dbUrl = process.env.TEST_DB_URL as string;
  dbName = process.env.TEST_DB_NAME as string;
  dbUser = process.env.TEST_DB_USER as string;
  dbHost = process.env.TEST_DB_HOST;
  dbPassword = process.env.TEST_DB_PASSWORD;
} else {
  // dbUrl = process.env.DB_URL as string;
  dbName = process.env.DB_NAME as string;
  dbUser = process.env.DB_USER as string;
  dbHost = process.env.DB_HOST;
  dbPassword = process.env.DB_PASSWORD;
}

//Creating an instance of Sequelize
export const sequelize = new Sequelize(
  `${dbName}`,
  `${dbUser}`,
  `${dbPassword}`,
  {
    host: dbHost,
    dialect: 'postgres',
    logging: false, // This disables logging 😌 🎉
  }
);

const sequelizeConnection = async () => {
  try {
    // connect to the db
    sequelize.authenticate().then(() => {
      console.log(`🍏 Successfully connected to the db 🔥${dbName}🔥`);
      // run migrations
      sequelize
        .sync()
        .then(() => {
          console.log('🍏 Tables migrated successfully');
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.log(
              `🍎 Error occurred when migrating tables: ${error.message}`
            );
          } else {
            console.log('🍎 Unexpected error', error);
          }
        });
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

export default sequelizeConnection;
