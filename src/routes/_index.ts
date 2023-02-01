import { Router } from 'express';
import testRouter from './test.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
/*
 * Any subsequent routes can be added here following a similar fashion as this above
 */

export default router;
