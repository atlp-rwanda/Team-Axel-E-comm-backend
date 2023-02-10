import { Router } from 'express';
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
<<<<<<< HEAD
  create2FAToken,
  verify2FAToken,
=======
  loginUser,
  logoutUser,
>>>>>>> c14b36c662fb544ecc09941d3f35c92b2d3cda69
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
