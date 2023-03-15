/* eslint-disable no-undef */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("notifications", [
      {
        id: "01fd9c03-b8d5-4c5f-bd36-86889e09260b",
        userId: "a45fc063-b7e6-468b-963d-512e840778c4",
        title: "Product creation",
        message: "Product biscuits has been created successfully",
      },
      {
        id: "8c3958ef-5957-4783-a191-83fea90e469b",
        userId: "a45fc063-b7e6-468b-963d-512e840778c4",
        title: "Product deletion",
        message: "Product biscuit has been deleted successfully",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
