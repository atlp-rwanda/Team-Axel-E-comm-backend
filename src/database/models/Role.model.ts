import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

export interface RoleAttribute {
  id: string;
  role: string;
  routes: string[];
}

export type RolePermissionCreationAttributes = Optional<RoleAttribute, "id">;

interface RoleInstance
  extends Model<RoleAttribute, RolePermissionCreationAttributes>,
    RoleAttribute {
  createdAt?: Date;
  updatedAt?: Date;
}
const Role = sequelize.define<RoleInstance>(
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
    routes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      set(value: string[]) {
        this.setDataValue(
          "routes",
          value.map((route) => {
            if (!route.startsWith("/api/v1")) throw new Error("Invalid route");
            return route.toLowerCase();
          }),
        );
      },
    },
  },
  {
    modelName: "Role",
    tableName: "roles",
  },
);

export default Role;
