import Product from "../database/models/Product.model";
import { ProductAttributes } from "../interfaces";

export const createProductService = async (newProduct: ProductAttributes) => {
  const createProductRequest = await Product.create(newProduct);
  return createProductRequest;
};

export const getAvailableProductsService = async () => {
  const getProductsRequest = await Product.findAll({
    where: { stock: "Available" },
  });
  return getProductsRequest;
};

export const findOrCreateProductService = async (
  newProduct: ProductAttributes,
) => {
  const findOrCreateProductRequest = await Product.findOrCreate({
    where: { name: newProduct.name },
    defaults: newProduct,
  });
  return findOrCreateProductRequest;
};

export const findProductService = async (productId: string) => {
  const getProductRequest = await Product.findByPk(productId);
  return getProductRequest;
};

export const getAllItemsService = async () => {
  const allItems = await Product.findAll();
  return allItems;
};