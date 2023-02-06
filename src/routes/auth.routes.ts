import { Router } from 'express';
import { confirmUser } from '../controllers/_index';

const authRouter = Router();

authRouter.get('/confirm/:confirmationCode', confirmUser); // Confirm the user who registered

export default authRouter;
