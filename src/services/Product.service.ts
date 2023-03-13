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

export const getOneAvailableProductService = async (productId: string) => {
  const getOneProductRequest = await Product.findOne({
    where: { stock: "Available", id: productId },
  });
  return getOneProductRequest;
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

export const findOneProductService = async (id: string) => {
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  return product;
};

export const destroyProductService = async (id: string) => {
  const clearProduct = await Product.destroy({
    where: {
      id,
    },
  });
  return clearProduct;
};

export const getAllItemsService = async () => {
  const allItems = await Product.findAll();
  return allItems;
};

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
