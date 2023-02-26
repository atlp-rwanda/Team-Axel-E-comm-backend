// import { QueryInterface } from 'sequelize';

// export = {
//   up: async (queryInterface: QueryInterface) => {
//     await queryInterface.bulkInsert('Users', [
//       [
//         {
//           id: 'a6adf4ad-dac5-4ac6-9419-cd885de58eb0',
//           surName: 'KANYOMBYA',
//           givenName: 'Admin',
//           email: 'admin@gmail.com',
//           password:
//             '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
//           status: 'Active',
//           role: 'Admin',
//         },
//         {
//           id: 'a45fc063-b7e6-468b-963d-512e840778c4',
//           surName: 'KANYOMBYA',
//           givenName: 'Seller',
//           email: 'seller@gmail.com',
//           password:
//             '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
//           status: 'Active',
//           role: 'Seller',
//         },
//         {
//           id: 'c472332c-db04-46c0-80b9-4315a26ccf63',
//           surName: 'KANYOMBYA',
//           givenName: 'Buyer',
//           email: 'buyer@gmail.com',
//           password:
//             '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
//           status: 'Active',
//           role: 'Buyer',
//         },
//       ],
//     ]);
//   },

//   down: async (queryInterface: QueryInterface) => {
//     await queryInterface.bulkDelete('Users', {});
//   },
// };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  seed an admin, seller, and buyer
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'a6adf4ad-dac5-4ac6-9419-cd885de58eb0',
          surname: 'KANYOMBYA',
          given_name: 'Admin',
          email: 'admin@gmail.com',
          password:
            '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
          status: 'Active',
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'a45fc063-b7e6-468b-963d-512e840778c4',
          surname: 'KANYOMBYA',
          given_name: 'Seller',
          email: 'seller@gmail.com',
          password:
            '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
          status: 'Active',
          role: 'Seller',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'c472332c-db04-46c0-80b9-4315a26ccf63',
          surname: 'KANYOMBYA',
          given_name: 'Buyer',
          email: 'buyer@gmail.com',
          password:
            '$2a$12$NSJOdLeS/Tz7zZzVRp5glO9nhAnRzLa3bA1GOF6vCMYCbI/Meo/Xu',
          status: 'Active',
          role: 'Buyer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
