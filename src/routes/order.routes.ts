import { Router } from "express";
import {
  createOrder,
  clearOrders,
  ViewOrders,
  getOrderStatus,
  updatedOrderStatus,
  AdminGetAllOrders,
} from "../controllers";
import { isAdmin } from "../middleware/auth";
import { protectRoute } from "../services/protectRoutes.service";

const orderRouter = Router();

orderRouter.post("/", protectRoute, createOrder);
orderRouter.get("/get/all", protectRoute, ViewOrders);
orderRouter.delete("/delete/all", protectRoute, clearOrders);
orderRouter.get("/status/:orderId", protectRoute, getOrderStatus);
orderRouter.put("/status/:orderId", protectRoute, isAdmin, updatedOrderStatus);
orderRouter.get("/all", protectRoute, isAdmin, AdminGetAllOrders);
export default orderRouter;
