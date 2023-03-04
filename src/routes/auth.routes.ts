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
import { protectRoute } from "../services/protectRoutes.service";

const authRouter = Router();

authRouter.post("/login", ValidateJoi(UserSchema.loginData.create), loginUser); // login a User

authRouter.get("/logout", [protectRoute], logoutUser); //logout a user

authRouter.get("/confirm/:confirmationCode", confirmUser); // Confirm the user who registered

authRouter.post("/auth/requestResetPassword", resetPasswordRequestController); // Request a reset password

authRouter.post("/auth/resetPassword/:token", resetPasswordController); // Reset the password

authRouter.post("/2fa", protectRoute, create2FAToken); // Create a 2FA token

authRouter.post("/2fa/verify2FAToken", protectRoute, verify2FAToken); // Verify the 2FA token

export default authRouter;
