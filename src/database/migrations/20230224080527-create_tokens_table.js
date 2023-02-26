// import { QueryInterface, DataTypes } from 'sequelize';

// export = {
//   up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
//     await queryInterface.createTable('Tokens', {
//       id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         primaryKey: true,
//       },
//       code: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       expire: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       userId: {
//         type: Sequelize.UUID,
//         references: {
//           model: 'Users',
//           key: 'id',
//         },
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW(),
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW(),
//       },
//     });
//   },

//   down: async (queryInterface: QueryInterface) => {
//     await queryInterface.dropTable('Tokens');
//   },
// };

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create tokens table
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      expire: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // drop tokens table
    await queryInterface.dropTable('tokens');
  },
};
