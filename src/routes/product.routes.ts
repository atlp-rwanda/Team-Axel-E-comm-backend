import { Router } from "express";
import {
  createProduct,
  getAvailableProducts,
  deleteOneItemFromproduct,
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

//delete one product
productRouter.delete(
  "/delete/:id",
  [isAuth, isSeller],
  deleteOneItemFromproduct,
);
export default productRouter;
