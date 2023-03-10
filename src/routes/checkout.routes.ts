import { Router } from "express";
import { checkoutController } from "../controllers/Checkout.controller";
import { isAuth } from "../middleware/auth";
import { CheckoutSchema, ValidateJoi } from "../middleware/validation";

const checkoutRouter = Router();

checkoutRouter.post(
  "/payment",
  [isAuth, ValidateJoi(CheckoutSchema.checkout.create)],
  checkoutController.checkoutPayment,
);

export default checkoutRouter;
