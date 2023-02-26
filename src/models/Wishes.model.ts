import Sequelize from 'sequelize';
import { sequelize } from '../db/config';

export const Wishlist = sequelize.define(
  'wishlist',
  {
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
  },
  {
    freezeTableName: false,
    tableName: 'wishlists',
  }
);
