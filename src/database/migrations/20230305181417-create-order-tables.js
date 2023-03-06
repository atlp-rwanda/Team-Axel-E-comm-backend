/* eslint-disable no-undef */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      items: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Pending", "Shipped", "Delivered"),
        defaultValue: "Pending",
      },
      expectedDeliveryDate: {
        type: Sequelize.DATE,
        defaultValue: function () {
          const now = new Date();
          const deliveryDate = new Date(
            now.getTime() + 5 * 24 * 60 * 60 * 1000,
          ); // add 5 days of order in milliseconds
          return deliveryDate;
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("orders");
  },
};
