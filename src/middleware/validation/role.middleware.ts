import Joi from "joi";
import { RoleAttribute } from "../../database/models/Role.model";

export const RoleSchema = {
  role: {
    create: Joi.object<RoleAttribute>({
      role: Joi.string().required(),
      routes: Joi.array().items(Joi.string()).required(),
    }),
    update: Joi.object<RoleAttribute>({
      role: Joi.string(),
      routes: Joi.array().items(Joi.string()),
    }),
    assign: Joi.object<RoleAttribute>({
      id: Joi.string().required(),
    }),
  },
};
