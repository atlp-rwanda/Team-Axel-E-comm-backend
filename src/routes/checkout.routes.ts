import { Router } from "express";
import { checkoutController } from "../controllers/Checkout.controller";
import { CheckoutSchema, ValidateJoi } from "../middleware/validation";
import { protectRoute } from "../middleware/auth";

const checkoutRouter = Router();

checkoutRouter.post(
  "/payment",
  [protectRoute, ValidateJoi(CheckoutSchema.checkout.create)],
  checkoutController.checkoutPayment,
);

export default checkoutRouter;
