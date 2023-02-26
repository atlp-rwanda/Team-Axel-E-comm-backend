import { Router } from 'express';
import { addToCart, clearCart, removeFromCart, viewCart } from '../controllers';
import { isAuth } from '../middleware/auth';
import { ProductSchema, ValidateJoi } from '../middleware/validation';

const cartRouter = Router();

cartRouter.post(
  '/add',
  [isAuth, ValidateJoi(ProductSchema.product.addToCart)],
  addToCart
); // add to cart

cartRouter.get('/', [isAuth], viewCart); // view cart

cartRouter.delete('/remove/:id', [isAuth], removeFromCart); // remove item from cart

cartRouter.delete('/clear', [isAuth], clearCart); // clear cart

export default cartRouter;
