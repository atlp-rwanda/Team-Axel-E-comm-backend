import { Router } from 'express';
import testRouter from './test.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import passportRouter from './passport.routes';

const router = Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
router.use(authRouter);
router.use(passportRouter);

/*
 * Any subsequent routes can be added here following a similar fashion as this above
 */

export default router;
