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
          id: "cccbc6eb-d927-436a-9284-7de00b26b807",
          role: "ADMIN",
          routes: ["*"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b5b7638-961b-45d1-959a-cefc08e5f25e",
          role: "SELLER",
          routes: [
            "/api/v1/auth/logout",
            "/api/v1/auth/2fa",
            "/api/v1/auth/2fa/verify2FAToken",
            "/api/v1/auth/updatepassword",
            "/api/v1/product/",
            "/api/v1/product/items",
            "/api/v1/product/delete/:id",
            "/api/v1/product/update/:id",
            "/api/v1/notification/all",
            "/api/v1/notification/read/:id",
            "/api/v1/notification/read",
            "/api/v1/chat/",
            "/api/v1/chat",
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5b628ec1-6400-431e-bfa6-2668352cac6c",
          role: "BUYER",
          routes: [
            "/api/v1/auth/logout",
            "/api/v1/auth/2fa",
            "/api/v1/auth/2fa/verify2FAToken",
            "/api/v1/auth/updatepassword",
            "/api/v1/cart/",
            "/api/v1/cart/add",
            "/api/v1/cart/add/",
            "/api/v1/cart/remove/:id",
            "/api/v1/cart/clear",
            "/api/v1/cart/update/:id",
            "/api/v1/chat/",
            "/api/v1/chat",
            "/api/v1/checkout",
            "/api/v1/notification/all",
            "/api/v1/notification/read",
            "/api/v1/order/",
            "/api/v1/order/get/all",
            "/api/v1/order/delete/all",
            "/api/v1/order/status/:orderId",
            "/api/v1/productReview/:productId",
            "/api/v1/productReview/edit/:productId",
            "/api/v1/productReview/delete/:productId",
            "/api/v1/wishes/:productId",
            "/api/v1/wishes/",
            "/api/v1/wishes/all",
            "/api/v1/wishes/:id",
          ],
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
