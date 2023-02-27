import { Request, Response } from 'express';
import { Op, WhereOptions, fn } from 'sequelize';
import { IQueryParams, ProductAttributes } from '../interfaces';
import {
  findOrCreateProductService,
  getAvailableProductsService,
} from '../services';
import Product from '../database/models/Product.model';

export const searchProducts = async (req: Request, res: Response) => {
  // TODO: make sure the search feature works in swagger
  const queryParams = req.query as IQueryParams;
  const { name, minPrice, maxPrice, category } = queryParams;
  /*
   * in case you want to search against lowercase data,
   * 1️⃣ first:
   * convert the search query to lower case
   * 2️⃣ second:
   * modify the Op condition to search for iLike where the data from the db
   * will first be converted to lowercase
   */
  const lowercaseName = name ? name.toLowerCase() : undefined;

  try {
    const whereClause: WhereOptions = {};
    if (lowercaseName) {
      whereClause.name = {
        [Op.iLike]: fn('lower', `%${lowercaseName}%`),
      };
    }
    /*
     * if just want to search against strict values, it's just as simple as this.
     */

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }

    // if only minPrice is provided or only maxPrice is provided
    if (minPrice || maxPrice) {
      if (minPrice) {
        whereClause.price = { [Op.gte]: minPrice };
      }

      if (maxPrice) {
        whereClause.price = { [Op.lte]: maxPrice };
      }
    }

    // if both minPrice and maxPrice are provided
    if (minPrice && maxPrice) {
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    }

    // if category is provided
    if (category) {
      whereClause.category = category;
    }

    const products = await Product.findAll({ where: whereClause });
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
