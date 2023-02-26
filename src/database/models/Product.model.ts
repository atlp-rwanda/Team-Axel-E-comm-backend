/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface ProductAttributes {
  id: string;
  sellerId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  stock: Stock;
  images: string;
}

export enum Stock {
  Available = 'Available',
  OutOfStock = 'Out of Stock',
}

type TokenCreationAttributes = Optional<ProductAttributes, 'id'>;

interface ProductInstance
  extends Model<ProductAttributes, TokenCreationAttributes>,
    ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Product = sequelize.define<ProductInstance>(
  'Product',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sellerId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    stock: {
      type: DataTypes.ENUM('Available', 'Out of Stock'),
      defaultValue: 'Available',
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Product',
    tableName: 'products',
  }
);

export default Product;

// import { Model, DataTypes, Sequelize } from 'sequelize';

// interface ProductsAttributes {
//   id: string;
//   sellerId: string;
//   name: string;
//   category: string;
//   description: string;
//   price: number;
//   quantity: number;
//   stock: Stock;
//   images: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// enum Stock {
//   Available,
//   OutOfStock,
// }

// interface ProductsInstance
//   extends Model<ProductsAttributes>,
//     ProductsAttributes {
//   createdAt: Date;
//   updatedAt: Date;
//   associate: (models: any) => void;
// }

// export default function defineProducts(sequelize: Sequelize) {
//   sequelize.define<ProductsInstance>(
//     'Products',
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       sellerId: {
//         type: DataTypes.UUID,
//         references: {
//           model: 'products',
//           key: 'id',
//         },
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       category: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       stock: {
//         type: DataTypes.ENUM('Available', 'OutofStock'),
//         defaultValue: 'Available',
//       },
//       quantity: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1,
//       },
//       price: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       images: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//       },
//     },
//     {
//       modelName: 'Products',
//       tableName: 'products',
//       timestamps: true,
//       // sequelize,
//     }
//   );
// }

// import Sequelize from 'sequelize';
// import dbInstance from '.';

// export const Product = dbInstance.sequelize.define(
//   'product',
//   {
// id: {
//   type: Sequelize.UUID,
//   defaultValue: Sequelize.UUIDV4,
//   primaryKey: true,
// },
// sellerId: {
//   type: Sequelize.UUID,
//   references: {
//     model: 'products',
//     key: 'id',
//   },
// },
// name: {
//   type: Sequelize.STRING,
//   allowNull: false,
//   unique: true,
// },
// category: {
//   type: Sequelize.STRING,
//   allowNull: false,
//   unique: false,
// },
// description: {
//   type: Sequelize.STRING,
//   allowNull: false,
//   unique: false,
// },
// stock: {
//   type: Sequelize.ENUM('Available', 'Out of stock'),
//   defaultValue: 'Available',
// },
// quantity: {
//   type: Sequelize.INTEGER,
//   defaultValue: 1,
// },
// price: {
//   type: Sequelize.FLOAT,
//   allowNull: false,
// },
// images: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
//   },
//   {
//     freezeTableName: true,
//     tableName: 'products',
//   }
// );
