import Joi from 'joi';
import { IUser } from '../../interfaces';

export const UserSchema = {
  user: {
    create: Joi.object<IUser>({
      surName: Joi.string().required(),
      givenName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, 1 digit, and one case character.',
          'string.empty': 'Password cannot be empty',
          'any.required': 'Password is required',
        }),
      province: Joi.string(),
      district: Joi.string(),
      sector: Joi.string(),
      cell: Joi.string(),
      street: Joi.string(),
      role: Joi.string(),
    }),
  },

  loginData: {
    create: Joi.object<IUser>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
