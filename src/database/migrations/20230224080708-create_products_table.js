// import { QueryInterface, DataTypes } from 'sequelize';

// export = {
//   up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
//     await queryInterface.createTable('Products', {
//       id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         primaryKey: true,
//       },
//       sellerId: {
//         type: Sequelize.UUID,
//         references: {
//           model: 'users',
//           key: 'id',
//         },
//       },
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       category: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       stock: {
//         type: Sequelize.ENUM('Available', 'Out of stock'),
//         defaultValue: 'Available',
//       },
//       quantity: {
//         type: Sequelize.INTEGER,
//         defaultValue: 1,
//       },
//       price: {
//         type: Sequelize.FLOAT,
//         allowNull: false,
//       },
//       images: {
//         type: Sequelize.STRING,
//         allowNull: false,
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
//     await queryInterface.dropTable('Products');
//   },
// };

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create products table
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      sellerId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stock: {
        type: Sequelize.ENUM('Available', 'Out of Stock'),
        defaultValue: 'Available',
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      images: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // id: {
      //   type: Sequelize.UUID,
      //   defaultValue: uuidv4(),
      //   primaryKey: true,
      // },
      // name: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   unique: true,
      // },
      // description: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   unique: false,
      // },
      // price: {
      //   type: Sequelize.DECIMAL,
      //   allowNull: false,
      //   unique: false,
      // },
      // quantity: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   unique: false,
      // },
      // image: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   unique: false,
      // },
      // userId: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      // },
      // sellerId: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   references: {
      //     model: 'sellers',
      //     key: 'id',
      //   },
      // },
      // createdAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      //   unique: false,
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      //   unique: false,
      // },
    });
    // // create a relationship between users(sellers) and products
    // await queryInterface.addConstraint('products', {
    //   fields: ['sellerId'],
    //   type: 'foreign key',
    //   name: 'fk_products_users',
    //   references: {
    //     table: 'users',
    //     field: 'id',
    //   },
    // });
  },

  async down(queryInterface, Sequelize) {
    // drop products table
    await queryInterface.dropTable('products');
  },
};
