import { Router } from 'express';
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
  create2FAToken,
  verify2FAToken,
} from '../controllers/_index';

const authRouter = Router();

authRouter.get('/confirm/:confirmationCode', confirmUser); // Confirm the user who registered
authRouter.post('/auth/requestResetPassword', resetPasswordRequestController);
authRouter.post('/auth/resetPassword/:token', resetPasswordController);
authRouter.post('/auth/2fa', create2FAToken);
authRouter.post('/auth/2fa/verify2FAToken', verify2FAToken);

export default authRouter;
