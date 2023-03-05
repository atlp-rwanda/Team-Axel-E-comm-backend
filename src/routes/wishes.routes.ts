import { Router } from "express";
import {
  addWishlistItem,
  getWishlist,
  clearWishlist,
  clearOneWishlistItem,
} from "../controllers";
import { isAuth } from "../middleware/auth";

const wishRouter = Router();

wishRouter.post("/:productId", isAuth, addWishlistItem); // add to wishlist

wishRouter.get("/", [isAuth], getWishlist); // vew all wishes

wishRouter.delete("/all", [isAuth], clearWishlist); // clear all wishes

wishRouter.delete("/:id", [isAuth], clearOneWishlistItem); // clear one wishes

export default wishRouter;
