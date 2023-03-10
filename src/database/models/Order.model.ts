import { DataTypes } from "sequelize";
import { sequelize } from ".";

const Order = sequelize.define(
  "Order",
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
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Shipped", "Delivered"),
      defaultValue: "Pending",
    },
    payment: {
      type: DataTypes.ENUM("Pending", "Paid"),
      defaultValue: "Pending",
    },
    expectedDeliveryDate: {
      type: DataTypes.DATE,
      defaultValue: function () {
        const now = new Date();
        const deliveryDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
        return deliveryDate;
      },
    },
  },
  {
    modelName: "Order",
    tableName: "orders",
  },
);
export default Order;
