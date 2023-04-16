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
import { protectRoute } from "../services/protectRoutes.service";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { getAccessKeys } from "../utils/roleConstants";

let MERCHANT_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  MERCHANT_ACCESSKEY = Keys.MERCHANT_ACCESSKEY;
});

const productRouter = Router();

// Create a product
productRouter.post(
  "/",
  [protectRoute, ValidateJoi(ProductSchema.product.create)],
  AuthAndRoleChecker(() => ({ value: MERCHANT_ACCESSKEY })),
  createProduct,
);

// Get all products
productRouter.get("/available", getAvailableProducts);

// Get one available product
productRouter.get("/available/:id", getOneAvailableProduct);

// search for products
productRouter.get("/search", searchProducts); // search for products

// Seller getting all items
productRouter.get(
  "/items",
  [protectRoute],
  AuthAndRoleChecker(() => ({ value: MERCHANT_ACCESSKEY })),
  getAllSellerItems,
);

productRouter.delete(
  "/delete/:id",
  [protectRoute],
  AuthAndRoleChecker(() => ({ value: MERCHANT_ACCESSKEY })),
  deleteOneItemFromproduct,
);

productRouter.patch(
  "/update/:id",
  [protectRoute, ValidateJoi(ProductSchema.product.updateSellerProduct)],
  AuthAndRoleChecker(() => ({ value: MERCHANT_ACCESSKEY })),
  updateProduct,
);

export default productRouter;
