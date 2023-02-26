/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import bcrypt from 'bcryptjs';

export interface UserAttributes {
  id: string;
  surname: string;
  given_name: string;
  email: string;
  password: string;

  role?: Role;
  status?: Status;

  avatar?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  street?: string;
  confirmationCode?: string;
  googleId?: string;
  resetToken?: string;
}

export enum Status {
  Pending = 'Pending',
  Active = 'Active',
}

export enum Role {
  Admin = 'Admin',
  Buyer = 'Buyer',
  Seller = 'Seller',
}
/*
  We have to declare the UserCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
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
// /* eslint-disable no-shadow */
// import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// interface UsersAttributes {
// id: string;
// surname: string;
// given_name: string;
// email: string;
// password: string;
// province: string;
// district: string;
// sector: string;
// cell: string;
// street: string;
// role: string;
// status: Status;
// confirmationCode: string;
// googleId: string;
// resetToken: string;
// createdAt: Date;
// updatedAt: Date;
// }

// enum Status {
//   Pending,
//   Active,
// }

// interface UsersInstance extends Model<UsersAttributes>, UsersAttributes {
//   createdAt: Date;
//   updatedAt: Date;
//   associate: (models: any) => void;
// }

// export default function defineUsers(sequelize: Sequelize) {
//   sequelize.define<UsersInstance>(
//     'Users',
//     {
// id: {
//   type: DataTypes.UUID,
//   defaultValue: DataTypes.UUIDV4,
//   primaryKey: true,
// },
// surname: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: false,
// },
// given_name: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: false,
// },
// email: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: true,
// },
// password: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// role: {
//   type: DataTypes.ENUM('Admin', 'Buyer', 'Seller'),
//   defaultValue: 'Buyer',
// },
// status: {
//   type: DataTypes.ENUM('Pending', 'Active'),
//   defaultValue: 'Pending',
// },
// confirmationCode: {
//   type: DataTypes.STRING,
//   unique: true,
// },
// googleId: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// resetToken: {
//   type: DataTypes.STRING,
//   unique: true,
// },
// province: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// district: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// sector: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// cell: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// street: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// createdAt: {
//   allowNull: false,
//   type: DataTypes.DATE,
// },
// updatedAt: {
//   allowNull: false,
//   type: DataTypes.DATE,
// },
//     },
//     {
//       modelName: 'Users',
//       tableName: 'users',
//       timestamps: true,
//       // sequelize,
//     }
//   );
// }

// ************************************************************
// import bcrypt from 'bcryptjs';
// import dbInstance from '.';
// import { DataTypes } from 'sequelize';

// export const User = dbInstance.sequelize.define(
//   'user',
//   {
// id: {
//   type: DataTypes.UUID,
//   defaultValue: DataTypes.UUIDV4,
//   primaryKey: true,
// },
// surName: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: false,
// },
// givenName: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: false,
// },
// email: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: true,
// },
// password: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// role: {
//   type: DataTypes.ENUM('Admin', 'Buyer', 'Seller'),
//   defaultValue: 'Buyer',
// },
// status: {
//   type: DataTypes.ENUM('Pending', 'Active'),
//   defaultValue: 'Pending',
// },
// confirmationCode: {
//   type: DataTypes.STRING,
//   unique: true,
// },
// googleId: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// resetToken: {
//   type: DataTypes.STRING,
//   unique: true,
// },
// province: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// district: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// sector: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// cell: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// street: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
//   },
//   {
//     freezeTableName: false,
//     tableName: 'users',
//   hooks: {
//     beforeCreate: async (user: any) => {
//       const hashedPassword = await bcrypt.hash(
//         user.password,
//         bcrypt.genSaltSync(10)
//       );
//       user.password = hashedPassword;
//     },
//   },
// }
// );
