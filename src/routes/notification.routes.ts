import { Router } from "express";
import { isAuth } from "../middleware/auth";
import {
  getAllNotifications,
  readAllNotifications,
  readOneNotification,
} from "../controllers/Notifications.controller";

const notificationRouter = Router();

// View all notifications
notificationRouter.get("/all", [isAuth], getAllNotifications);

// Read one notification'
notificationRouter.delete("/read/:id", [isAuth], readOneNotification);

// Read all notifications
notificationRouter.delete("/read", [isAuth], readAllNotifications);

export default notificationRouter;
