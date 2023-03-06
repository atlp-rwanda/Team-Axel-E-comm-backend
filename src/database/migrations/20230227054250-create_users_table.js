/* eslint-disable no-undef */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // create users table
    await queryInterface.createTable("users", {
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
      role: {
        type: Sequelize.ENUM("Admin", "Buyer", "Seller"),
        defaultValue: "Buyer",
      },
      status: {
        type: Sequelize.ENUM("Pending", "Active"),
        defaultValue: "Pending",
      },
      confirmationCode: {
        type: Sequelize.STRING,
        unique: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetToken: {
        type: Sequelize.STRING,
        unique: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cell: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
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
    // drop users table
    await queryInterface.dropTable("users");
  },
};
