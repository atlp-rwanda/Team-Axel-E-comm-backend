import { DataTypes } from "sequelize";

import { sequelize } from ".";

const Wishlist = sequelize.define(
  "wishlist",
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
  },
  {
    freezeTableName: false,
    tableName: "wishlists",
  },
);
export default Wishlist;
