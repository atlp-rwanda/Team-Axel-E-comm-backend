import { Router } from "express";
import {
  addWishlistItem,
  getWishlist,
  clearWishlist,
  clearOneWishlistItem,
} from "../controllers";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { getAccessKeys } from "../utils/roleConstants";

let CUSTOMER_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  CUSTOMER_ACCESSKEY = Keys.CUSTOMER_ACCESSKEY;
});

const wishRouter = Router();

wishRouter.post(
  "/:productId",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  addWishlistItem,
);

wishRouter.get(
  "/",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  getWishlist,
);

wishRouter.delete(
  "/all",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  clearWishlist,
);

wishRouter.delete(
  "/:id",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  clearOneWishlistItem,
);

export default wishRouter;
