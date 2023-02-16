import { Router } from 'express';
import { createProduct, getAvailableProducts } from '../controllers/_index';
import { ValidateJoi, ProductSchema } from '../middleware/validation/_index';

const productRouter = Router();

// Create a product
productRouter.post(
  '/',
  ValidateJoi(ProductSchema.product.create),
  createProduct
);

// Get all products
productRouter.get('/all', getAvailableProducts);

export default productRouter;
