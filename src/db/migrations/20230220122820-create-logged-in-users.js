/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loggedInUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      surName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      givenName: {
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
        set(value) {
          this.setDataValue(
            'password',
            bcrypt.hashSync(value, bcrypt.genSaltSync(10))
          );
        },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user',
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Active'),
        defaultValue: 'Pending',
      },
      confirmationCode: {
        type: Sequelize.STRING,
        unique: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loggedInUsers');
  },
};
