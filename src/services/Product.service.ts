import { Product } from '../models';
import { IProduct } from '../interfaces';

// Create or Add a product
export const createProductService = async (newProduct: IProduct) => {
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

// Get all items

export const getAllItemsServices = async () => {
  const allItems = await Product.findAll();
  return allItems;
};

// Seller should update a product
export const updateProductService = async (productId: string) => {
  const productToUpdate = await Product.findOne({
    where: { id: productId },
  });
  return productToUpdate;
};
