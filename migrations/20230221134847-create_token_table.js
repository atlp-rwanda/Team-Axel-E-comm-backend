/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  create tokens table
    await queryInterface.createTable(
      'tokens',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
        },
        expire: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
        },
        user: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
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
