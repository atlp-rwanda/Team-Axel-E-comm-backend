import { Router } from "express";
import {
  createOrder,
  clearOrders,
  ViewOrders,
  getOrderStatus,
  updatedOrderStatus,
  AdminGetAllOrders,
} from "../controllers";
import { protectRoute } from "../middleware/auth/protectRoutes.middleware";

const orderRouter = Router();

orderRouter.post("/", protectRoute, createOrder);
orderRouter.get("/get/all", protectRoute, ViewOrders);
orderRouter.delete("/delete/all", protectRoute, clearOrders);
orderRouter.get("/status/:id", protectRoute, getOrderStatus);
orderRouter.put("/status/:id", protectRoute, updatedOrderStatus);
orderRouter.get("/all", protectRoute, AdminGetAllOrders);
export default orderRouter;
