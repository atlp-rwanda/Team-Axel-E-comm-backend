import Joi from 'joi';
import { ICart, IProduct } from '../../interfaces';

export const ProductSchema = {
  product: {
    create: Joi.object<IProduct>({
      name: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      stock: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      images: Joi.string(),
    }),
    addToCart: Joi.object<ICart>({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  },
};
