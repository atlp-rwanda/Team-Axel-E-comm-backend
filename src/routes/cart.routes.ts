import { Router } from 'express';
import { addToCart, clearCart, viewCart } from '../controllers';
import { isAuth } from '../middleware/auth';
import { ProductSchema, ValidateJoi } from '../middleware/validation';

const cartRouter = Router();

cartRouter.post(
  '/',
  [isAuth, ValidateJoi(ProductSchema.product.addToCart)],
  addToCart
); // add to cart

cartRouter.get('/', [isAuth], viewCart); // view cart

cartRouter.delete('/', [isAuth], clearCart); // clear cart

export default cartRouter;
