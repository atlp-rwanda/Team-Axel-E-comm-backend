import { Router } from "express";
import { protectRoute } from "../middleware/auth/protectRoutes.middleware";
import { getChat } from "../controllers/Chat.controller";

const chatRouter = Router();

chatRouter.get("/", [protectRoute], getChat);

export default chatRouter;
