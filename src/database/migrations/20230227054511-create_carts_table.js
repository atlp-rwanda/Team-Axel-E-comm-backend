/* eslint-disable no-undef */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create carts table
    await queryInterface.createTable("carts", {
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
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    // create a relationship between carts and products
    await queryInterface.addConstraint("carts", {
      fields: ["productId"],
      type: "foreign key",
      name: "fk_carts_products",
      references: {
        table: "products",
        field: "id",
      },
    });
  },

  async down(queryInterface) {
    // drop carts table
    await queryInterface.dropTable("carts");
  },
};
