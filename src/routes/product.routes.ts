import { Router } from "express";
import {
  createProduct,
  getAllSellerItems,
  getAvailableProducts,
  deleteOneItemFromproduct,
  getOneAvailableProduct,
  updateProduct,
} from "../controllers";
import { ValidateJoi, ProductSchema } from "../middleware/validation";
import { searchProducts } from "../controllers";
import { protectRoute } from "../middleware/auth/protectRoutes.middleware";

const productRouter = Router();

// Create a product
productRouter.post(
  "/",
  [protectRoute, ValidateJoi(ProductSchema.product.create)],
  createProduct,
);

// Get all products
productRouter.get("/available", getAvailableProducts);

// Get one available product
productRouter.get("/available/:id", getOneAvailableProduct);

// search for products
productRouter.get("/search", searchProducts); // search for products

// Seller getting all items
productRouter.get("/items", [protectRoute], getAllSellerItems);

productRouter.delete("/delete/:id", [protectRoute], deleteOneItemFromproduct);

productRouter.patch(
  "/update/:id",
  [protectRoute, ValidateJoi(ProductSchema.product.updateSellerProduct)],
  updateProduct,
);

export default productRouter;
