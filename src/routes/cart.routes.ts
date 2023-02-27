import { Router } from 'express';
import { addToCart, clearCart, updateCart, viewCart } from '../controllers';
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

cartRouter.delete('/update/:id', [isAuth], updateCart); // cart update.
export default cartRouter;
