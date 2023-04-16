/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { ProductAttributes } from "../../interfaces";

type TokenCreationAttributes = Optional<ProductAttributes, "id">;

interface ProductInstance
  extends Model<ProductAttributes, TokenCreationAttributes>,
    ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Product = sequelize.define<ProductInstance>(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sellerId: {
      type: DataTypes.UUID,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
      type: DataTypes.ENUM("Available", "Out of Stock", "Expired"),
      defaultValue: "Available",
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
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    modelName: "Product",
    tableName: "products",
  },
);

export default Product;
