import { Router } from "express";
import { isAuth, isAdmin } from "../middleware/auth";
import { protectRoute } from "../services/protectRoutes.service";
import {
  addReview,
  getReview,
  deleteallProductReview,
  deleteUserReview,
  updateReview,
} from "../controllers/Review.controller";

const reviewRout = Router();

reviewRout.post("/:productId", isAuth, addReview);
reviewRout.get("/get/:productId", getReview);
reviewRout.delete(
  "/delete/all/:productId",
  protectRoute,
  isAdmin,
  deleteallProductReview,
);
reviewRout.put("/edit/:productId", isAuth, updateReview);
reviewRout.delete("/delete/:productId", isAuth, deleteUserReview);
export default reviewRout;
