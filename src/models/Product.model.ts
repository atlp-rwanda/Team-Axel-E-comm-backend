import Sequelize from 'sequelize';
import { sequelize } from '../db/config';

export const Product = sequelize.define(
  'product',
  {
    sellerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    stock: {
      type: Sequelize.ENUM('Available', 'Out of stock'),
      defaultValue: 'Available',
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    images: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: 'products',
  }
);
