import Role, {
  RoleAttribute,
  RolePermissionCreationAttributes,
} from "../database/models/Role.model";
import { findOneUserByIdService } from "./User.service";

export const getAllRolesService = async () => {
  const roles = await Role.findAll();
  return roles;
};

export const getRoleByIdService = async (id: string) => {
  const role = await Role.findByPk(id);
  return role;
};

export const getRoleByNameService = async (role: string) => {
  const foundRole = await Role.findOne({ where: { role } });
  return foundRole;
};

export const createRoleService = async ({
  role,
  routes,
}: RolePermissionCreationAttributes) => {
  const createdRole = await Role.create({ role, routes });
  return createdRole;
};

export const updateRoleService = async ({
  id,
  role,
  routes,
}: RoleAttribute) => {
  const updatedRole = await Role.update({ role, routes }, { where: { id } });
  return updatedRole;
};

export const deleteRoleService = async (id: string) => {
  const deletedRole = await Role.destroy({ where: { id } });
  return deletedRole;
};

export const assignRoleService = async ({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) => {
  const user = await findOneUserByIdService(userId);
  const role = await getRoleByIdService(id);
  if (!user || !role) throw new Error("User or role not found");

  user.set({ role: role.id });
  await user.save();
  return user;
};
