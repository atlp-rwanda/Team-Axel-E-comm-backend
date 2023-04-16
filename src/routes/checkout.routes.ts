import { Router } from "express";
import { checkoutController } from "../controllers/Checkout.controller";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { CheckoutSchema, ValidateJoi } from "../middleware/validation";
import { getAccessKeys } from "../utils/roleConstants";

let CUSTOMER_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  CUSTOMER_ACCESSKEY = Keys.CUSTOMER_ACCESSKEY;
});

const checkoutRouter = Router();

checkoutRouter.post(
  "/payment",
  [ValidateJoi(CheckoutSchema.checkout.create)],
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  checkoutController.checkoutPayment,
);

export default checkoutRouter;
