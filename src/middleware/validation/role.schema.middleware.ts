import Joi from "joi";
import { RoleAndPermissionAttribute } from "../../interfaces/Roles.interface";

export const RoleSchema = {
  roleAndPermissions: Joi.object<RoleAndPermissionAttribute>({
    role: Joi.string().required(),
  }),
  roleTobeSet: Joi.object({
    role: Joi.string().required(),
  }),
};
