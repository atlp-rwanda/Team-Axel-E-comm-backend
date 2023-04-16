import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { RoleAndPermissionAttribute } from "../../interfaces/Roles.interface";

type RolePermissionCreationAttributes = Optional<
  RoleAndPermissionAttribute,
  "id"
>;

interface RoleAndPermissionInstance
  extends Model<RoleAndPermissionAttribute, RolePermissionCreationAttributes>,
    RoleAndPermissionAttribute {
  createdAt?: Date;
  updatedAt?: Date;
}
const Roles = sequelize.define<RoleAndPermissionInstance>(
  "Role",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue("role", value.toUpperCase());
      },
    },
  },
  {
    modelName: "Roles",
    tableName: "roles",
  },
);

export default Roles;
