import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Product, { ProductAttributes } from './Product.model';

export interface CartAttributes {
  id: string;
  productId: string;
  quantity: number;
  userId: string;
  Product?: ProductAttributes[];
}

/*
  We have to declare the CartCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
type CartCreationAttributes = Optional<CartAttributes, 'id'>;

interface CartInstance
  extends Model<CartAttributes, CartCreationAttributes>,
    CartAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Cart = sequelize.define<CartInstance>(
  'Cart',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Product',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    modelName: 'Cart',
    tableName: 'carts',
  }
);

// Add the belongsTo association to the Product model
Cart.belongsTo(Product, { foreignKey: 'productId' });

export default Cart;

// Cart.belongsTo(Product, { foreignKey: 'productId' }); // define the belongsTo relationship

// import { Model, DataTypes, Sequelize } from 'sequelize';
// import sequelize from '.';

// interface CartsAttributes {
// id: string;
// productId: string;
// quantity: number;
// userId: string;
// createdAt: Date;
// updatedAt: Date;
// }

// interface CartsInstance extends Model<CartsAttributes>, CartsAttributes {
//   createdAt: Date;
//   updatedAt: Date;
//   associate: (models: any) => void;
// }

// export default function defineCarts(sequelize: Sequelize) {
//   sequelize.define<CartsInstance>(
//     'Carts',
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//   userId: {
//     type: DataTypes.UUID,
//     references: {
//       model: 'users',
//       key: 'id',
//     },
//   },
//   productId: {
//     type: DataTypes.UUID,
//     references: {
//       model: 'products',
//       key: 'id',
//     },
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     defaultValue: 1,
//   },
//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//   },
//   updatedAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//   },
// },
//     {
//       modelName: 'Carts',
//       tableName: 'carts',
//       timestamps: true,
// sequelize,
// hooks: {
//   afterDefine: (model: CartsInstance) => {
//     this.belongsTo(models.User, {
//       foreignKey: 'userId',
//       as: 'createdBy',
//     });

//     this.belongsTo(models.Product, {
//       foreignKey: 'productId',
//       as: 'product',
//     });
//   },
// },
//     }
//   );
// }

// import Sequelize from 'sequelize';
// import dbInstance from '.';
// import { Product } from './Product.model';

// export const Cart = dbInstance.sequelize.define(
//   'cart',
// {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     primaryKey: true,
//   },
//   userId: {
//     type: Sequelize.UUID,
//     references: {
//       model: 'users',
//       key: 'id',
//     },
//   },
//   productId: {
//     type: Sequelize.UUID,
//     references: {
//       model: 'products',
//       key: 'id',
//     },
//   },
//   quantity: {
//     type: Sequelize.INTEGER,
//     defaultValue: 1,
//   },
// },
//   {
//     freezeTableName: false,
//     tableName: 'carts',
//   }
// );

// Cart.belongsTo(Product, { foreignKey: 'productId' }); // define the belongsTo relationship
