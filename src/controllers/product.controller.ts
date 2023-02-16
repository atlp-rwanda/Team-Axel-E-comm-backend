import { Request, Response } from 'express';
import {
  createProductService,
  getAvailableProductsService,
} from '../services/_index';
import { Product } from '../db/schemas/_index';
import { User } from '../db/schemas/_index';

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;

    // Checking if the user is logged in and whether he is a seller
    const sellerId = req.session.userId;
    const thisSellerExists = await User.findOne({
      where: { id: sellerId, role: 'seller' },
    });
    if (!thisSellerExists) {
      res.status(401).json({
        status: 401,
        success: false,
        message: 'You are not allowed to access this route',
      });
    } else {
      // Check if Product already exist to avoid duplication
      const thisProductExists = await Product.findOne({
        where: { name: newProduct.name },
      });
      if (thisProductExists) {
        return res.status(400).json({
          status: 400,
          success: false,
          message:
            'This Product already exists, You can update the stock levels',
          data: thisProductExists,
        });
      } else {
        // Create the product and signing the user to the product
        const createdProduct = await createProductService({
          ...newProduct,
          sellerId,
        });
        res
          .status(201)
          .json({ status: 201, success: true, data: [createdProduct] });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error creating product: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// Getting all products from the database
export const getAvailableProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await getAvailableProductsService();
    res.status(200).json({ status: 200, success: true, data: allProducts });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching products from the db: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
};
