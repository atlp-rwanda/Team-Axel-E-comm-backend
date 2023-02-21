import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { TokenAttributes } from '../../interfaces';

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
