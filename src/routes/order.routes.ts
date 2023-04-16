import { Router } from "express";
import {
  createOrder,
  clearOrders,
  ViewOrders,
  getOrderStatus,
  updatedOrderStatus,
  AdminGetAllOrders,
} from "../controllers";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { protectRoute } from "../services/protectRoutes.service";
import { getAccessKeys } from "../utils/roleConstants";

let ADMIN_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  ADMIN_ACCESSKEY = Keys.ADMIN_ACCESSKEY;
});

const orderRouter = Router();

orderRouter.post("/", protectRoute, createOrder);
orderRouter.get("/get/all", protectRoute, ViewOrders);
orderRouter.delete("/delete/all", protectRoute, clearOrders);
orderRouter.get("/status/:orderId", protectRoute, getOrderStatus);
orderRouter.put(
  "/status/:orderId",
  protectRoute,
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  updatedOrderStatus,
);
orderRouter.get(
  "/all",
  protectRoute,
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  AdminGetAllOrders,
);
export default orderRouter;
