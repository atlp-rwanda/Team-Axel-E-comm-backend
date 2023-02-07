import Sequelize from 'sequelize';
import { sequelize } from '../config';
import bcrypt from 'bcryptjs';

export const User = sequelize.define(
  'user',
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
    
  },
  {
    freezeTableName: true,
    tableName: 'Users',
  }
);
