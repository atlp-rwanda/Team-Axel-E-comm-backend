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
import { protectRoute } from "../middleware/auth/protectRoutes.middleware";

const authRouter = Router();

authRouter.post("/login", ValidateJoi(UserSchema.loginData.create), loginUser);

authRouter.get("/logout", [protectRoute], logoutUser);

authRouter.get("/confirm/:confirmationCode", confirmUser);

authRouter.post("/requestResetPassword", resetPasswordRequestController);

authRouter.post("/resetPassword/:token", resetPasswordController);

authRouter.post("/2fa", protectRoute, create2FAToken);

authRouter.post("/2fa/verify2FAToken", protectRoute, verify2FAToken);

authRouter.post(
  "/updatepassword",
  protectRoute,
  ValidateJoi(UserSchema.passwordUpdate.create),
  updatePassword,
);

export default authRouter;
