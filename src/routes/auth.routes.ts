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

import { updatePassword } from "../controllers/updatePassword.controller";
import { protectRoute } from "../services/protectRoutes.service";
import { isSeller } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/login", ValidateJoi(UserSchema.loginData.create), loginUser); // login a User

authRouter.get("/logout", [protectRoute], logoutUser); //logout a user

authRouter.get("/confirm/:confirmationCode", confirmUser); // Confirm the user who registered

authRouter.post("/requestResetPassword", resetPasswordRequestController); // Request a reset password

authRouter.post("/resetPassword/:token", resetPasswordController); // Reset the password

authRouter.post("/2fa", protectRoute, isSeller, create2FAToken); // Create a 2FA token

authRouter.post("/2fa/verify2FAToken", protectRoute, isSeller, verify2FAToken); // Verify the 2FA token

authRouter.post(
  "/updatepassword",
  protectRoute,
  ValidateJoi(UserSchema.passwordUpdate.create),
  updatePassword,
);

export default authRouter;
