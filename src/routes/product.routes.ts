import { Router } from 'express';
import {
  createProduct,
  getAllSellerItems,
  getAvailableProducts,
  updateProduct,
} from '../controllers';
import { ValidateJoi, ProductSchema } from '../middleware/validation';
import { searchProducts } from '../controllers';
import { isAuth, isSeller } from '../middleware/auth';

const productRouter = Router();

// Create a product
productRouter.post(
  '/',
  [isAuth, isSeller, ValidateJoi(ProductSchema.product.create)],
  createProduct
);

// Get all products
productRouter.get('/available', getAvailableProducts);

// search for products
productRouter.get('/search', searchProducts); // search for products

// Seller getting all items
productRouter.get('/items', [isAuth], [isSeller], getAllSellerItems);

// Seller update a product
productRouter.patch('/update/:id', [isAuth, isSeller], updateProduct);

export default productRouter;
