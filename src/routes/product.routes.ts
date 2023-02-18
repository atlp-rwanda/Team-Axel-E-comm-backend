import { Router } from "express";
import {
  createProduct,
  getAvailableProducts,
  updateProduct,
} from "../controllers";
import { ValidateJoi, ProductSchema } from "../middleware/validation";
import { searchProducts } from "../controllers";
import { isAuth, isSeller } from "../middleware/auth";

const productRouter = Router();

// Create a product
productRouter.post(
  "/",
  [isAuth, isSeller, ValidateJoi(ProductSchema.product.create)],
  createProduct,
);

// Get all products
productRouter.get("/available", getAvailableProducts);

// search for products
productRouter.get("/search", searchProducts); // search for products

// Seller update product
productRouter.patch(
  "/update/:id",
  [isAuth, isSeller, ValidateJoi(ProductSchema.product.updateSellerProduct)],
  updateProduct,
);

export default productRouter;
