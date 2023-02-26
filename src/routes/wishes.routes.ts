import { Router } from 'express';
import {
  addToWishlist,
  getAllWishes,
  clearWish,
  clearOneWish,
} from '../controllers';
import { isAuth } from '../middleware/auth';

const wishRouter = Router();

wishRouter.post('/:productId', isAuth, addToWishlist); // add to wishlist

wishRouter.get('/', [isAuth], getAllWishes); // vew all wishes

wishRouter.delete('/all', [isAuth], clearWish); // clear all wishes

wishRouter.delete('/:id', [isAuth], clearOneWish); // clear one wishes

export default wishRouter;
