import { Router } from "express";
import { protectRoute } from "../middleware/auth/protectRoutes.middleware";
import {
  addReview,
  getReview,
  deleteallProductReview,
  deleteUserReview,
  updateReview,
} from "../controllers/Review.controller";

const reviewRout = Router();

reviewRout.post("/:id", protectRoute, addReview);
reviewRout.get("/get/:id", getReview);
reviewRout.delete("/delete/all/:id", protectRoute, deleteallProductReview);
reviewRout.put("/edit/:id", protectRoute, updateReview);
reviewRout.delete("/delete/:id", protectRoute, deleteUserReview);
export default reviewRout;
