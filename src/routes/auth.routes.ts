import { Router } from "express";
import {
  confirmUser,
  resetPasswordRequestController,
  resetPasswordController,
  create2FAToken,
  verify2FAToken,
  loginUser,
  logoutUser,
} from "../controllers";
import { ValidateJoi } from "../middleware/validation/validation.middleware";
import { UserSchema } from "../middleware/validation/user.schema.middleware";
import { isAuth } from "../middleware/auth";
import { updatePassword } from "../controllers/updatePassword.controller";


const authRouter = Router();

authRouter.post("/login", ValidateJoi(UserSchema.loginData.create), loginUser); // login a User

authRouter.get("/logout", [isAuth], logoutUser); //logout a user

authRouter.get("/confirm/:confirmationCode", confirmUser); // Confirm the user who registered

authRouter.post("/auth/requestResetPassword", resetPasswordRequestController); // Request a reset password

authRouter.post("/auth/resetPassword/:token", resetPasswordController); // Reset the password

authRouter.post("/auth/2fa", create2FAToken); // Create a 2FA token

authRouter.post("/auth/2fa/verify2FAToken", verify2FAToken); // Verify the 2FA token

authRouter.post(
  "/updatepassword",
  isAuth,
  ValidateJoi(UserSchema.passwordUpdate.create),
  updatePassword,
);


export default authRouter;
