import { Router } from "express";
import {
  getAllNotifications,
  readAllNotifications,
  readOneNotification,
} from "../controllers/Notifications.controller";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { getAccessKeys } from "../utils/roleConstants";

let CUSTOMER_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  CUSTOMER_ACCESSKEY = Keys.CUSTOMER_ACCESSKEY;
});

const notificationRouter = Router();

// View all notifications
notificationRouter.get(
  "/all",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  getAllNotifications,
);

// Read one notification'
notificationRouter.delete(
  "/read/:id",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  readOneNotification,
);

// Read all notifications
notificationRouter.delete(
  "/read",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  readAllNotifications,
);

export default notificationRouter;
