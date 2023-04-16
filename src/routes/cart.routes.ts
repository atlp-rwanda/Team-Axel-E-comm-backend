import { Router } from "express";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartProduct,
  viewCart,
} from "../controllers";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { ProductSchema, ValidateJoi } from "../middleware/validation";
import { protectRoute } from "../services/protectRoutes.service";
import { getAccessKeys } from "../utils/roleConstants";

let CUSTOMER_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  CUSTOMER_ACCESSKEY = Keys.CUSTOMER_ACCESSKEY;
});

const cartRouter = Router();

cartRouter.post(
  "/add",
  [protectRoute, ValidateJoi(ProductSchema.product.addToCart)],
  addToCart,
);

cartRouter.get("/", [protectRoute], viewCart);

cartRouter.delete("/remove/:id", [protectRoute], removeFromCart);

cartRouter.delete(
  "/clear",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  clearCart,
);

cartRouter.patch(
  "/update/:id",
  [protectRoute, ValidateJoi(ProductSchema.product.updateCart)],
  updateCartProduct,
);

export default cartRouter;
