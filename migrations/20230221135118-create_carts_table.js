'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  create carts table
    await queryInterface.createTable(
      'carts',
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
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
