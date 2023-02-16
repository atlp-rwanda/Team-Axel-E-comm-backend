import { Router } from 'express';
import testRouter from './test.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import productRouter from './product.routes';

const router = Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
router.use(authRouter);
router.use('/product', productRouter);
/*
 * Any subsequent routes can be added here following a similar fashion as this above
 */

export default router;
