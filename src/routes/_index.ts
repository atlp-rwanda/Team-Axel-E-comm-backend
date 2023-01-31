import { Router } from 'express';
import testRouter from './test.routes';

const router = Router();

router.use('/test', testRouter);
/*
 * Any subsequent routes can be added here following a similar fashion as this above
 */

export default router;
