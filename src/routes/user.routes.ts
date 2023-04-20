import { Router } from "express";
import { createUser, getAllUsers, getOneUser } from "../controllers";
import { UserSchema, ValidateJoi } from "../middleware/validation";
import { protectRoute } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/all", [protectRoute], getAllUsers);

userRouter.get("/:id", getOneUser);

userRouter.post("/", [ValidateJoi(UserSchema.user.create)], createUser);

export default userRouter;
