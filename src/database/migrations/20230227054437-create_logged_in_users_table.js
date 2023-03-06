/* eslint-disable no-undef */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create logged_in_users table
    await queryInterface.createTable("logged_in_users", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.UUIDV4,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      given_name: {
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
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    // drop logged_in_users table
    await queryInterface.dropTable("logged_in_users");
  },
};
