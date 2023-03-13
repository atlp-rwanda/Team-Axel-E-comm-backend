import Joi from "joi";
import { RoleAndPermissionAttribute } from "../../interfaces/Roles&Permission.interface";

export const RoleAndPermissionsSchema = {
  roleAndPermissions: Joi.object<RoleAndPermissionAttribute>({
    role: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
  }),
  roleTobeSet: Joi.object({
    role: Joi.string().required(),
  }),
  permissionsToAdd: Joi.object({
    permissions: Joi.array().items(Joi.string()).required(),
  }),
  permissionsToRemove: Joi.object({
    permissions: Joi.array().items(Joi.string()).required(),
  }),
};
