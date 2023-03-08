import { Router } from "express";
import { addToCart, clearCart, removeFromCart, viewCart } from "../controllers";
import { ProductSchema, ValidateJoi } from "../middleware/validation";
import { protectRoute } from "../services/protectRoutes.service";

const cartRouter = Router();

cartRouter.post(
  "/add",
  [protectRoute, ValidateJoi(ProductSchema.product.addToCart)],
  addToCart,
);

cartRouter.get("/", [protectRoute], viewCart);

cartRouter.delete("/remove/:id", [protectRoute], removeFromCart);

cartRouter.delete("/clear", [protectRoute], clearCart);

export default cartRouter;
