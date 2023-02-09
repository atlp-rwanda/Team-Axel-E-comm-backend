import { Router } from 'express';
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
  loginUser,
  logoutUser,
  create2FAToken,
  verify2FAToken,
} from '../controllers/_index';
import { ValidateJoi } from '../middleware/validation/validation.middleware';
import { UserSchema } from '../middleware/validation/user.schema.middleware';

const authRouter = Router();

// login a User
authRouter.post('/login', ValidateJoi(UserSchema.loginData.create), loginUser);
//logout a user
authRouter.get('/logout', logoutUser);
// Confirm the user who registered
authRouter.get('/confirm/:confirmationCode', confirmUser);
authRouter.post('/auth/requestResetPassword', resetPasswordRequestController);
authRouter.post('/auth/resetPassword/:token', resetPasswordController);
authRouter.post('/auth/2fa', create2FAToken);
authRouter.post('/auth/2fa/verify2FAToken', verify2FAToken);

export default authRouter;
