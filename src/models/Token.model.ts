import Sequelize from 'sequelize';
import { sequelize } from '../db/config';

export const AuthToken = sequelize.define(
  'token',
  {
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    expire: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    freezeTableName: true,
    tableName: 'tokens',
  }
);
