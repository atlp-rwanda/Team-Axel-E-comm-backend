import Product, { ProductAttributes } from '../database/models/Product.model';

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

// Get a product by id
export const findProductService = async (productId: string) => {
  const getProductRequest = await Product.findByPk(productId);
  return getProductRequest;
};

// check if the product already exists by name
export const checkProductExistence = async (name: string) => {
  // check if this product already exists by checking the name and category
  const productExists = await Product.findOne({
    where: { name },
  });
  return productExists;
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
