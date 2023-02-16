import Sequelize from 'sequelize';
import { sequelize } from '../config';

export const Product = sequelize.define(
  'product',
  {
    sellerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
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
      type: Sequelize.STRING,
      allowNull: false,
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
    tableName: 'Products',
  }
);
