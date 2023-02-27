/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import bcrypt from 'bcryptjs';
import { UserAttributes } from '../../interfaces';

/*
 * The `UserAttributes` interface is defined in the `src/interfaces/User.interface.ts` file
 */

/*
 * We have to declare the UserCreationAttributes to
 * tell Sequelize and TypeScript that the property id,
 * in this case, is optional to be passed at creation time
 */

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    given_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
    role: {
      type: DataTypes.ENUM('Admin', 'Buyer', 'Seller'),
      defaultValue: 'Buyer',
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Active'),
      defaultValue: 'Pending',
    },
    confirmationCode: {
      type: DataTypes.STRING,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      unique: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cell: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: UserAttributes) => {
        const hashedPassword = await bcrypt.hash(
          user.password,
          bcrypt.genSaltSync(10)
        );
        user.password = hashedPassword;
      },
    },
  }
);

export default User;

// ************************************************************
