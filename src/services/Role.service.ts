import Roles from "../database/models/Roles.model";
import { RoleAndPermissionAttribute } from "../interfaces/Roles.interface";

export const setRoleService = async (role: RoleAndPermissionAttribute) => {
  const setRoleRequest = await Roles.create(role);
  return setRoleRequest;
};

export const getRoleService = async (role: string) => {
  const oneRole = await Roles.findOne({
    where: { role },
  });
  return oneRole;
};

export const getAllRolesService = async () => {
  const roles = await Roles.findAll();
  return roles;
};

export const deleteRoleService = async (id: string) => {
  const destroyedRole = await Roles.destroy({
    where: { id },
  });
  return destroyedRole;
};
