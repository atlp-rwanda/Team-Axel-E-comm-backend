import Sequelize from 'sequelize';
import { sequelize } from '../db/config';

export const Order = sequelize.define(
  'order',
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
    items: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('pending', 'shipped', 'delivered'),
      defaultValue: 'pending',
    },
    expectedDeliveryDate: {
      type: Sequelize.DATE,
      defaultValue: function () {
        const now = new Date();
        const deliveryDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // add 5 days  of order in milliseconds
        return deliveryDate;
      },
    },
  },
  {
    freezeTableName: false,
    tableName: 'orders',
  }
);
