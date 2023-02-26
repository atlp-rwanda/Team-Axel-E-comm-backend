import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface TokenAttributes {
  id: string;
  code: string;
  expire: string;
  userId: string;
  // createdAt: Date;
  // updatedAt: Date;
}

/*
  We have to declare the TokenCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
type TokenCreationAttributes = Optional<TokenAttributes, 'id'>;

interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Token = sequelize.define<TokenInstance>(
  'Token',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    expire: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    modelName: 'Token',
    tableName: 'tokens',
  }
);

export default Token;

// ************************************************************
// import { Model, DataTypes, Sequelize } from 'sequelize';

// interface TokensAttributes {
// id: string;
// code: string;
// expire: string;
// userId: string;
// createdAt: Date;
// updatedAt: Date;
// }

// interface TokensInstance extends Model<TokensAttributes>, TokensAttributes {
//   createdAt: Date;
//   updatedAt: Date;
//   associate: (models: any) => void;
// }

// export default function defineTokens(sequelize: Sequelize) {
//   sequelize.define<TokensInstance>(
//     'Tokens',
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
// code: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: false,
// },
// expire: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: false,
// },
// userId: {
//   type: DataTypes.UUID,
//   references: {
//     model: 'tokens',
//     key: 'id',
//   },
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
//       modelName: 'Tokens',
//       tableName: 'tokens',
//       timestamps: true,
//       // sequelize,
//     }
//   );
// }

// ************************************************************
// import Sequelize from 'sequelize';
// import dbInstance from '.';

// export const AuthToken = dbInstance.sequelize.define(
//   'token',
//   {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     primaryKey: true,
//   },
//   code: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: false,
//   },
//   expire: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: false,
//   },
//   userId: {
//     type: Sequelize.UUID,
//     references: {
//       model: 'tokens',
//       key: 'id',
//     },
//   },
// },
//   {
//     freezeTableName: true,
//     tableName: 'tokens',
//   }
// );
