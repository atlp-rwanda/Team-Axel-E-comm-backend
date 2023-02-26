import { Request, Response } from 'express';
import { Product } from '../models';
import { Op, WhereOptions, fn } from 'sequelize';
import { IQueryParams } from '../interfaces';
import { createProductService, getAvailableProductsService } from '../services';

export const searchProducts = async (req: Request, res: Response) => {
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

    if (minPrice && maxPrice) {
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    }

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
        success: false,
        message: `🍎 Something went wrong when searching for the product: ${error.message}`,
      });
    } else console.log(`🍎 Something went wrong: `, error);
  }
};

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;

    // Check if Product already exist to avoid duplication
    const thisProductExists = await Product.findOne({
      where: { name: newProduct.name },
    });
    if (thisProductExists) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'This Product already exists, You can update the stock levels',
        data: thisProductExists,
      });
    } else {
      // Create the product and signing the user to the product
      const sellerId = req.user.id;
      const createdProduct = await createProductService({
        ...newProduct,
        sellerId,
      });
      res
        .status(201)
        .json({ status: 201, success: true, data: createdProduct });
    }
    // }
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

// Getting available products from the database
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

/// here is for delete one Item from collection

export const deleteOneItemFromproduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const available = await Product.findOne({
      where: {
        id,
      },
    });

    if (!available) {
      res.status(400).send({
        status: 400,
        message: 'this product not availble',
      });
    } else {
      const clearProduct = await Product.destroy({
        where: {
          id,
        },
      });
      res.status(201).send({
        status: 201,
        message: `product of Id :${id} deleted succesfull`,
        data: clearProduct,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: 'Error clearing while clearing product',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};
