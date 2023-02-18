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

// Update a product
export const updateProductService = async (
  productId: string,
  parsedDataToUpdate: ProductAttributes,
) => {
  const updatedProduct = await Product.update(parsedDataToUpdate, {
    where: { id: productId },
    returning: true,
  });
  return updatedProduct;
};