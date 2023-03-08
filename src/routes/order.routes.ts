import { Router } from "express";
import {
  createOrder,
  clearOrders,
  ViewOrders,
  getOrderStatus,
  updatedOrderStatus,
} from "../controllers";
import { isAdmin } from "../middleware/auth";
import { protectRoute } from "../services/protectRoutes.service";

const orderRouter = Router();

orderRouter.post("/", protectRoute, createOrder); // create order
orderRouter.get("/all", protectRoute, ViewOrders); // view all orders
orderRouter.delete("/alll", protectRoute, clearOrders); // delete all orders
orderRouter.get("/status/:orderId", protectRoute, getOrderStatus); //get order status
orderRouter.put("/status/:orderId", protectRoute, isAdmin, updatedOrderStatus); //updated order status
export default orderRouter;
