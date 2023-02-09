import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

//Configure dotenv
if (process.env.NODE_ENV !== 'production') dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

//Creating an instance of Sequelize
export const sequelize = new Sequelize(
  `${dbName}`,
  `${dbUser}`,
  `${dbPassword}`,
  {
    host: dbHost,
    dialect: 'postgres',
  }
);

const sequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`🍏 Successfully connected to the db`);
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

// Migrations
sequelize
  .sync()
  .then(() => {
    console.log('🍏 Tables migrated successfully');
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log(`🍎 Error occurred when migrating tables: ${error.message}`);
    } else {
      console.log('🍎 Unexpected error', error);
    }
  });

export default sequelizeConnection;
