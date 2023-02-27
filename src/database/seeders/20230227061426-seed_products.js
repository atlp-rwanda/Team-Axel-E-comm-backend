/* eslint-disable no-undef */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // seed the products
    await queryInterface.bulkInsert('products', [
      {
        id: '4b35a4b0-53e8-48a4-97b0-9d3685d3197c',
        name: 'Product 1',
        category: 'Category 1',
        description: 'Description 1',
        stock: 'Available',
        quantity: 10,
        price: 700,
        images: 'https://picsum.photos/id/26/4209/2769',
        sellerId: 'a45fc063-b7e6-468b-963d-512e840778c4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '926ade6c-21f7-4866-ae7f-360d1574839d',
        name: 'Product 2',
        category: 'Category 2',
        description: 'Description 2',
        stock: 'Available',
        quantity: 10,
        price: 1400,
        images: 'https://picsum.photos/id/26/4209/2769',
        sellerId: 'a45fc063-b7e6-468b-963d-512e840778c4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('products', null, {});
  },
};
