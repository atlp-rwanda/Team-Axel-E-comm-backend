import { Router } from "express";
import { createUser, getAllUsers, getOneUser } from "../controllers";
import { UserSchema, ValidateJoi } from "../middleware/validation";
import { isAdmin, isAuth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/all", [isAuth, isAdmin], getAllUsers); // Get all users

userRouter.get("/:id", getOneUser); // Get one user

userRouter.post("/", [ValidateJoi(UserSchema.user.create)], createUser); // Create a user

export default userRouter;
