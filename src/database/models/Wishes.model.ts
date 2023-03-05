import { DataTypes } from "sequelize";
import { sequelize } from ".";
const Wishlist = sequelize.define(
  "Wishlist",
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: "Product",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    modelName: "Wishlist",
    tableName: "wishlists",
  },
);
export default Wishlist;
