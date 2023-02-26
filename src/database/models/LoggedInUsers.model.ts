/* eslint-disable no-shadow */
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface LoggedInUserAttributes {
  id: string;
  surname: string;
  given_name: string;
  email: string;
  password: string;
  googleId: string;
  avatar: string;
}

/*
  We have to declare the LoggedInUserCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
type LoggedInUserCreationAttributes = Optional<LoggedInUserAttributes, 'id'>;

interface LoggedInUserInstance
  extends Model<LoggedInUserAttributes, LoggedInUserCreationAttributes>,
    LoggedInUserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date;
}

const LoggedInUser = sequelize.define<LoggedInUserInstance>(
  'LoggedInUser',
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
    modelName: 'LoggedInUser',
    tableName: 'logged_in_users',
  }
);

export default LoggedInUser;
// *********************************************************************************************************************

// import { Model, DataTypes, Sequelize } from 'sequelize';

// interface LoggedInUsersAttributes {
//   id: string;
//   surname: string;
//   given_name: string;
//   email: string;
//   password: string;
//   province: string;
//   district: string;
//   sector: string;
//   cell: string;
//   street: string;
//   role: string;
//   status: Status;
//   confirmationCode: string;
//   googleId: string;
//   resetToken: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// enum Status {
//   Pending,
//   Active,
// }

// interface LoggedInUsersInstance
//   extends Model<LoggedInUsersAttributes>,
//     LoggedInUsersAttributes {
//   createdAt: Date;
//   updatedAt: Date;
//   associate: (models: any) => void;
// }

// export default function defineLoggedInUsers(sequelize: Sequelize) {
//   sequelize.define<LoggedInUsersInstance>(
//     'LoggedInUsers',
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       surname: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       given_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       role: {
//         type: DataTypes.ENUM('Admin', 'Buyer', 'Seller'),
//         defaultValue: 'Buyer',
//       },
//       status: {
//         type: DataTypes.ENUM('Pending', 'Active'),
//         defaultValue: 'Pending',
//       },
//       confirmationCode: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       googleId: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       resetToken: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       province: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       district: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       sector: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       cell: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       street: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//       },
//     },
//     {
//       modelName: 'LoggedInUsers',
//       tableName: 'loggedInUsers',
//       timestamps: true,
//       // sequelize,
//     }
//   );
// }

// *********************************************************************************************************************
// import Sequelize from 'sequelize';
// import bcrypt from 'bcryptjs';
// import dbInstance from '.';

// export const LoggedIn = dbInstance.sequelize.define(
//   'loggedInUser',
//   {
//     id: {
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     surName: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: false,
//     },
//     givenName: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: Sequelize.STRING,
//       allowNull: true,
//       defaultValue: 'user',
//     },
//     status: {
//       type: Sequelize.ENUM('Pending', 'Active'),
//       defaultValue: 'Pending',
//     },
//     confirmationCode: {
//       type: Sequelize.STRING,
//       unique: true,
//     },
//     googleId: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     province: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     district: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     sector: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     cell: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     street: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     freezeTableName: false,
//     tableName: 'loggedInLoggedInUsers',
//     hooks: {
//       beforeCreate: async (user: any) => {
//         const hashedPassword = await bcrypt.hash(
//           user.password,
//           bcrypt.genSaltSync(10)
//         );
//         user.password = hashedPassword;
//       },
//     },
//   }
// );
