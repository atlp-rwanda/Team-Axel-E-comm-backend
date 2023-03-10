import { Router } from "express";
import {
  addWishlistItem,
  getWishlist,
  clearWishlist,
  clearOneWishlistItem,
} from "../controllers";
import { isAuth } from "../middleware/auth";

const wishRouter = Router();

wishRouter.post("/:productId", [isAuth], addWishlistItem);

wishRouter.get("/", [isAuth], getWishlist);

wishRouter.delete("/all", [isAuth], clearWishlist);

wishRouter.delete("/:id", [isAuth], clearOneWishlistItem);

export default wishRouter;
