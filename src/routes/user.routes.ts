import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers";
import { UserSchema, ValidateJoi } from "../middleware/validation";
import { isAdmin, isAuth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/all", [isAuth, isAdmin], getAllUsers); // Get all users

userRouter.get("/:id", getOneUser); // Get one user

userRouter.post("/", [ValidateJoi(UserSchema.user.create)], createUser); // Create a user
userRouter.patch(
  "/update/:id",
  isAuth,
  [ValidateJoi(UserSchema.updateUser.create)],
  updateUser,
);

export default userRouter;
