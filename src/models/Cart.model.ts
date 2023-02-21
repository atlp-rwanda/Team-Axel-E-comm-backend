import Sequelize from 'sequelize';
import { sequelize } from '../db/config';

export const Cart = sequelize.define(
  'cart',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: false,
    tableName: 'carts',
  }
);
