import { Router } from "express";
import { createUser, getAllUsers, getOneUser } from "../controllers";
import { UserSchema, ValidateJoi } from "../middleware/validation";
import { isAdmin } from "../middleware/auth";
import { protectRoute } from "../services/protectRoutes.service";

const userRouter = Router();

userRouter.get("/all", [protectRoute, isAdmin], getAllUsers); // Get all users

userRouter.get("/:id", getOneUser); // Get one user

userRouter.post("/", [ValidateJoi(UserSchema.user.create)], createUser); // Create a user

export default userRouter;
