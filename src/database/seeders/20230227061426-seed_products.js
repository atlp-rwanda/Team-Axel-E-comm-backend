/* eslint-disable no-undef */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // seed products, but first seed a seller
    await queryInterface.bulkInsert('users', [
      {
        id: 'aa109653-d2fb-4139-b0e1-04248649b309',
        surname: 'KANYOMBYA',
        given_name: 'Seller 2',
        email: 'seller2@gmail.com',
        password:
          '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
        status: 'Active',
        role: 'Seller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // then seed the products
    await queryInterface.bulkInsert('products', [
      {
        id: '4b35a4b0-53e8-48a4-97b0-9d3685d3197c',
        name: 'IKIVUGUTO',
        category: 'Ibifunyango',
        description: 'Mujye munywa amata mwa ma dajye mwe.',
        stock: 'Available',
        quantity: 10,
        price: 400,
        images: 'image',
        sellerId: 'aa109653-d2fb-4139-b0e1-04248649b309',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('products', null, {});
  },
};
