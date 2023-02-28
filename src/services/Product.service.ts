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

// implement a find product service
export const findProductService = async (productId: string) => {
  const getProductRequest = await Product.findByPk(productId);
  return getProductRequest;
};
