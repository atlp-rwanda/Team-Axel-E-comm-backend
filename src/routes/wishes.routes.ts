import { Router } from "express";
import {
  addWishlistItem,
  getWishlist,
  clearWishlist,
  clearOneWishlistItem,
} from "../controllers";
import { protectRoute } from "../middleware/auth";

const wishRouter = Router();

wishRouter.post("/:id", [protectRoute], addWishlistItem);

wishRouter.get("/", [protectRoute], getWishlist);

wishRouter.delete("/all", [protectRoute], clearWishlist);

wishRouter.delete("/:id", [protectRoute], clearOneWishlistItem);

export default wishRouter;
