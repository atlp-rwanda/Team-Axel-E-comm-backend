// import { QueryInterface, DataTypes } from 'sequelize';

// export = {
//   up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
//     await queryInterface.createTable('Carts', {
//       id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         primaryKey: true,
//       },
//       userId: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         unique: false,
//         references: {
//           model: 'Users',
//           key: 'id',
//         },
//       },
//       productId: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         unique: false,
//         references: {
//           model: 'Products',
//           key: 'id',
//         },
//       },
//       quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false,
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
//     await queryInterface.dropTable('Carts');
//   },
// };

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create carts table
    await queryInterface.createTable('carts', {
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
          model: 'users',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
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
    // create a relationship between carts and products
    await queryInterface.addConstraint('carts', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_carts_products',
      references: {
        table: 'products',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // drop carts table
    await queryInterface.dropTable('carts');
  },
};
