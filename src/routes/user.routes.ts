import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { UserSchema, ValidateJoi } from "../middleware/validation";
import { getAccessKeys } from "../utils/roleConstants";
import { protectRoute } from "../services/protectRoutes.service";

let ADMIN_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  ADMIN_ACCESSKEY = Keys.ADMIN_ACCESSKEY;
});

const userRouter = Router();

userRouter.get(
  "/all",
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  getAllUsers,
);

userRouter.get("/:id", getOneUser);

userRouter.post("/", [ValidateJoi(UserSchema.user.create)], createUser); // Create a user
userRouter.patch(
  "/update/:id",
  protectRoute,
  [ValidateJoi(UserSchema.updateUser.create)],
  updateUser,
);

export default userRouter;
