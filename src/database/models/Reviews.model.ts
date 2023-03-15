import { DataTypes } from "sequelize";
import { sequelize } from ".";
const Review = sequelize.define(
  "Review",
  {
    id: {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
      },
      defaultValue: 0,
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "Review",
    tableName: "reviews",
  },
);
export default Review;
