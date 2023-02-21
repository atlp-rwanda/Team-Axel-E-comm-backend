import Product from '../database/models/Product.model';
import { ProductAttributes } from '../interfaces';

// Create or Add a product
export const createProductService = async (newProduct: ProductAttributes) => {
  const createProductRequest = await Product.create(newProduct);
  return createProductRequest;
};

// Get all available products
export const getAvailableProductsService = async () => {
  const getProductsRequest = await Product.findAll({
    where: { stock: 'Available' },
  });
  return getProductsRequest;
};

// implement a find or create product service
export const findOrCreateProductService = async (
  newProduct: ProductAttributes
) => {
  const findOrCreateProductRequest = await Product.findOrCreate({
    where: { name: newProduct.name },
    defaults: newProduct,
  });
  return findOrCreateProductRequest;
};

// Seller getting all items
export const getAllItemsService = async () => {
  const allItems = await Product.findAll();
  return allItems;
};

// Seller should update a product
export const findProductService = async (productId: string) => {
  const productToUpdate = await Product.findOne({
    where: { id: productId },
  });
  return productToUpdate;
};
export const updateProductService = async (
  productId: string,
  parsedDataToUpdate: ProductAttributes
) => {
  const updatedProduct = await Product.update(parsedDataToUpdate, {
    where: { id: productId },
    returning: true,
  });
  return updatedProduct;
};
