import { Product } from '../db/schemas/_index';
import { IProduct } from '../interfaces/_index';

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
