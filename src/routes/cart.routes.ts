import { Router } from 'express';
import { addToCart, clearCart, removeFromCart, viewCart } from '../controllers';
import { isAuth } from '../middleware/auth';
import { ProductSchema, ValidateJoi } from '../middleware/validation';

const cartRouter = Router();

cartRouter.post(
  '/add',
  [isAuth, ValidateJoi(ProductSchema.product.addToCart)],
  addToCart
);

cartRouter.get('/', [isAuth], viewCart);

cartRouter.delete('/remove/:id', [isAuth], removeFromCart);

cartRouter.delete('/clear', [isAuth], clearCart);

export default cartRouter;
