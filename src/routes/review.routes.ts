import { Router } from "express";
import { protectRoute } from "../services/protectRoutes.service";
import {
  addReview,
  getReview,
  deleteallProductReview,
  deleteUserReview,
  updateReview,
} from "../controllers/Review.controller";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { getAccessKeys } from "../utils/roleConstants";

let ADMIN_ACCESSKEY = "";
let CUSTOMER_ACCESSKEY = "";

getAccessKeys((Keys: Record<string, string>) => {
  ADMIN_ACCESSKEY = Keys.ADMIN_ACCESSKEY;
  CUSTOMER_ACCESSKEY = Keys.CUSTOMER_ACCESSKEY;
});

const reviewRout = Router();

reviewRout.post(
  "/:productId",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  addReview,
);
reviewRout.get("/get/:productId", getReview);
reviewRout.delete(
  "/delete/all/:productId",
  protectRoute,
  [protectRoute],
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  deleteallProductReview,
);
reviewRout.put(
  "/edit/:productId",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  updateReview,
);
reviewRout.delete(
  "/delete/:productId",
  AuthAndRoleChecker(() => ({ value: CUSTOMER_ACCESSKEY })),
  deleteUserReview,
);
export default reviewRout;
