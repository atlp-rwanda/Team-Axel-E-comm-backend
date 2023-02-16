import Joi from 'joi';
import { IProduct } from '../../interfaces/_index';

export const ProductSchema = {
  product: {
    create: Joi.object<IProduct>({
      name: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      stock: Joi.string().required(),
      price: Joi.number().required(),
      images: Joi.string(),
    }),
  },
};
