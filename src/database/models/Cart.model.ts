import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import Product from "./Product.model";
import { CartAttributes } from "../../interfaces";

type CartCreationAttributes = Optional<CartAttributes, "id">;

interface CartInstance
  extends Model<CartAttributes, CartCreationAttributes>,
    CartAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Cart = sequelize.define<CartInstance>(
  "Cart",
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
        model: "User",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: "Product",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    modelName: "Cart",
    tableName: "carts",
  },
);

// Add the belongsTo association to the Product model
Cart.belongsTo(Product, { foreignKey: "productId" });

export default Cart;
