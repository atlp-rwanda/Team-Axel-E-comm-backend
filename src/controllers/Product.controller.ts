import { Request, Response } from 'express';
import { ProductAttributes } from '../interfaces';
import {
  findOrCreateProductService,
  getAvailableProductsService,
} from '../services';
import { searchProductsUtility } from '../utils';

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const products = await searchProductsUtility(req.query);
    res.status(200).json({
      status: 200,
      success: true,
      message: `🍏 Found`,
      data: products,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        status: 500,
        success: false,
        message: `🍎 Something went wrong when searching for the product`,
        error: error.message,
      });
    } else console.log(`🍎 Something went wrong: `, error);
  }
};

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body as ProductAttributes;
    const sellerId = req.user.id;
    // Check if Product already exist to avoid duplication
    const thisProductExists = await findOrCreateProductService({
      ...newProduct,
      sellerId,
    });
    if (thisProductExists[1] === false) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'This Product already exists, You can update the stock levels',
        data: thisProductExists,
      });
    } else {
      return res
        .status(201)
        .json({ status: 201, success: true, data: thisProductExists });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Something went wrong when creating the product',
        error: error.message,
      });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// Getting available products from the database
export const getAvailableProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await getAvailableProductsService();
    res.status(200).json({ status: 200, success: true, data: allProducts });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Something went wrong when getting the products',
        error: error.message,
      });
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
};
