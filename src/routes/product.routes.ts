import { Router } from "express";
import { protectRoute } from "../services/protectRoutes.service";
import {
  createProduct,
  getAvailableProducts,
  deleteOneItemFromproduct,
} from "../controllers";

import { ValidateJoi, ProductSchema } from "../middleware/validation";
import { searchProducts } from "../controllers";
import { isSeller } from "../middleware/auth";

const productRouter = Router();

// Create a product
productRouter.post(
  "/",
  [protectRoute, isSeller, ValidateJoi(ProductSchema.product.create)],
  createProduct,
);

// Get all products
productRouter.get("/available", getAvailableProducts);

// search for products
productRouter.get("/search", searchProducts); // search for products

//delete one product
productRouter.delete(
  "/delete/:id",
  [protectRoute, isSeller],
  deleteOneItemFromproduct,
);
export default productRouter;
