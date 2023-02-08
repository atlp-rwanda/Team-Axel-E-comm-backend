import { Router } from 'express';
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
  loginUser,
  logoutUser,
} from '../controllers/_index';
import { ValidateJoi } from '../middleware/validation/validation.middleware';
import { UserSchema } from '../middleware/validation/user.schema.middleware';

const authRouter = Router();

authRouter.post('/login', ValidateJoi(UserSchema.loginData.create), loginUser); // login a User
authRouter.get('/logout', logoutUser); //logout a user
authRouter.get('/confirm/:confirmationCode', confirmUser); // Confirm the user who registered
authRouter.post('/auth/requestResetPassword', resetPasswordRequestController);
authRouter.post('/auth/resetPassword/:token', resetPasswordController);

export default authRouter;
