import { Router } from "express";
import { addToCart, clearCart, removeFromCart, viewCart } from "../controllers";
import { protectRoute } from "../services/protectRoutes.service";
import { ProductSchema, ValidateJoi } from "../middleware/validation";

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
