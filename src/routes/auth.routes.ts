import { Router } from 'express';
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
} from '../controllers/_index';

const authRouter = Router();

authRouter.get('/confirm/:confirmationCode', confirmUser); // Confirm the user who registered
authRouter.post('/auth/requestResetPassword', resetPasswordRequestController);
authRouter.post('/auth/resetPassword/:token', resetPasswordController);

export default authRouter;
