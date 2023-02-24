import { Request, Response } from 'express';
import { Product } from '../db/models';
import { Op, WhereOptions, fn } from 'sequelize';
import { IProduct, IQueryParams } from '../interfaces';
import {
  createProductService,
  getAllItemsServices,
  getAvailableProductsService,
  updateProductService,
} from '../services';

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

// Seller Get all items
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const allItems = await getAllItemsServices();
    return res.status(200).json({ status: 200, success: true, data: allItems });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching all items: ${error.message}`);
      return res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// Seller update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const productToUpdate = await updateProductService(productId);
    const parsedData: IProduct = await JSON.parse(
      JSON.stringify(productToUpdate)
    );

    console.log('The product to update:', parsedData);

    if (parsedData) {
      if (req.body.name) {
        parsedData.name = req.body.name;
      }
      if (req.body.category) {
        parsedData.category = req.body.category;
      }
      if (req.body.description) {
        parsedData.description = req.body.description;
      }
      if (req.body.stock) {
        parsedData.stock = req.body.stock;
      }
      if (req.body.quantity) {
        parsedData.quantity = req.body.quantity;
      }
      if (req.body.price) {
        parsedData.price = req.body.price;
      }
      if (req.body.images) {
        parsedData.images = req.body.images;
      }
      if (req.body.sellerId) {
        parsedData.sellerId = req.body.sellerId;
      }

      // console.log("The product after an updates:", parsedData)
      const updatedProduct = await Product.update(parsedData, {
        where: { id: productId },
        returning: true,
      });

      // console.log("The updated data row is: ?????!!????", JSON.stringify(updatedProduct[1]));

      return res
        .status(200)
        .json({ status: 200, success: true, data: updatedProduct[1] }); // remember to make JSON format to read data
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'The Product Not Found',
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error for updating a product: ${error.message}`);
      return res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};
