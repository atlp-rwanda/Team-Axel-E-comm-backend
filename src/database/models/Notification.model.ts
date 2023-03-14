/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { NotificationAttributes } from "../../interfaces";

/*
 * The `NotificationAttributes` interface is defined in the `src/interfaces/Notification.interface.ts` file
 */

/*
 * We have to declare the NotificationAttributes to
 * tell Sequelize and TypeScript that the property id,
 * in this case, is optional to be passed at creation time
 */

type NotificationCreationAttributes = Optional<NotificationAttributes, "id">;

interface NotificationInstance
  extends Model<NotificationAttributes, NotificationCreationAttributes>,
    NotificationAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Notification = sequelize.define<NotificationInstance>(
  "Notification",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    modelName: "Notification",
    tableName: "notifications",
  },
);

export default Notification;

// ************************************************************
