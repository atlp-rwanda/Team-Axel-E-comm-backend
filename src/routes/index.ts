import { Router } from 'express';
import authRouter from './auth.routes';
import passportRouter from './passport.routes';
import productRouter from './product.routes';
import userRouter from './user.routes';
import cartRouter from './cart.routes';

const router = Router();

router.use('/auth', authRouter);
router.use(passportRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);

export default router;
