/* eslint-disable no-undef */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    //  seed an admin, seller, and buyer
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: "bffe40f9-dabe-42f5-a9bc-f0d92d4101a1",
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4b35a4b0-53e8-48a4-97b0-9d3685d3196b",
          role: "MERCHANT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bffe40f9-dabe-42f5-a9bc-f0d92d4101a2",
          role: "CUSTOMER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
