import Sequelize from 'sequelize';
import { sequelize } from '../db/config';
import bcrypt from 'bcryptjs';

export const LoggedIn = sequelize.define(
  'loggedInUser',
  {
    surName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    givenName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(value, bcrypt.genSaltSync(10))
        );
      },
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'user',
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Active'),
      defaultValue: 'Pending',
    },
    confirmationCode: {
      type: Sequelize.STRING,
      unique: true,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    district: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    sector: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cell: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: false,
    tableName: 'loggedInUsers',
  }
);
