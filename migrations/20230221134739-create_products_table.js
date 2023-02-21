/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create products table
    await queryInterface.createTable(
      'products',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
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
