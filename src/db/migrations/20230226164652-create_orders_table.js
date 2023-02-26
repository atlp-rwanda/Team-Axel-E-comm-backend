'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
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
          const deliveryDate = new Date(
            now.getTime() + 5 * 24 * 60 * 60 * 1000
          ); // add 5 days of order in milliseconds
          return deliveryDate;
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  },
};
