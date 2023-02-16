import { Router } from 'express';
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
  create2FAToken,
  verify2FAToken,
  loginUser,
  logoutUser,
} from '../controllers/_index';
import { ValidateJoi } from '../middleware/validation/validation.middleware';
import { UserSchema } from '../middleware/validation/user.schema.middleware';
import { protectRoute } from '../services/protectRoutes.service';
import { updatePassword } from '../controllers/updatePassword.controller';

const authRouter = Router();

// login a User
authRouter.post('/login', ValidateJoi(UserSchema.loginData.create), loginUser);
//logout a user
authRouter.get('/logout', logoutUser);
// Confirm the user who registered
authRouter.get('/confirm/:confirmationCode', confirmUser);
// login a User
authRouter.post('/login', ValidateJoi(UserSchema.loginData.create), loginUser);
//logout a user
authRouter.get('/logout', logoutUser);
// Confirm the user who registered
authRouter.get('/confirm/:confirmationCode', confirmUser);
authRouter.post('/auth/requestResetPassword', resetPasswordRequestController);
authRouter.post('/auth/resetPassword/:token', resetPasswordController);
// two factor authentication routes
authRouter.post('/auth/2fa', protectRoute, create2FAToken);
authRouter.post('/auth/2fa/verify2FAToken', protectRoute, verify2FAToken);
authRouter.post('/auth/updatepassword', protectRoute, updatePassword);

export default authRouter;
