import { Router } from "express";
import {
  addWishlistItem,
  getWishlist,
  clearWishlist,
  clearOneWishlistItem,
} from "../controllers";
import { protectRoute } from "../services/protectRoutes.service";

const wishRouter = Router();

wishRouter.post("/:productId", protectRoute, addWishlistItem); // add to wishlist

wishRouter.get("/", [protectRoute], getWishlist); // vew all wishes

wishRouter.delete("/all", [protectRoute], clearWishlist); // clear all wishes

wishRouter.delete("/:id", [protectRoute], clearOneWishlistItem); // clear one wishes

export default wishRouter;
