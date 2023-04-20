import { Router } from "express";
import {
  getAllNotifications,
  readAllNotifications,
  readOneNotification,
} from "../controllers/Notifications.controller";
import { protectRoute } from "../middleware/auth";

const notificationRouter = Router();

// View all notifications
notificationRouter.get("/all", [protectRoute], getAllNotifications);

// Read one notification'
notificationRouter.delete("/read/:id", [protectRoute], readOneNotification);

// Read all notifications
notificationRouter.delete("/read", [protectRoute], readAllNotifications);

export default notificationRouter;
