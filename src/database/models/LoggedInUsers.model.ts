/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { LoggedInUserAttributes } from "../../interfaces";

type LoggedInUserCreationAttributes = Optional<LoggedInUserAttributes, "id">;

interface LoggedInUserInstance
  extends Model<LoggedInUserAttributes, LoggedInUserCreationAttributes>,
    LoggedInUserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date;
}

const LoggedInUser = sequelize.define<LoggedInUserInstance>(
  "LoggedInUser",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    given_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "LoggedInUser",
    tableName: "logged_in_users",
  },
);

export default LoggedInUser;
// *********************************************************************************************************************
