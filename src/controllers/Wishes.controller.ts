import { Request, Response } from 'express';
import Product from '../database/models/Product.model';
import Wishlist from '../database/models/Wishes.model';

// here I want to add product to the buyer wish list
export const addToWishlist = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `🍎 Product with id ${productId} not found`,
      });
    }
    // Check if the product is already in the wishlist
    const isProductInWishlist = await Wishlist.findOne({
      where: { userId: userId, productId: productId },
    });
    if (isProductInWishlist) {
      return res.status(400).json({
        success: false,
        message: `🍎 Product with id ${productId} is already in the wishlist`,
      });
    } else {
      // Add the product to the wishlist

      const wishes = await Wishlist.create({ userId, productId });
      res.status(200).json({
        success: true,
        message: `🍏 Product with id ${productId} added to wishlist`,
        data: wishes,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: `🍎 Something went wrong when adding product with id ${productId} to wishlist: ${error.message}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `🍎 Something went wrong when adding product with id ${productId} to wishlist.`,
      });
    }
  }
};
//get user Wishes
export const getAllWishes = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const Allwishes = await Wishlist.findAll({
      where: {
        userId,
      },
    });

    // Get all the productIds in the wishlist
    const productIds = Allwishes.map((wish) => wish.dataValues.productId);
    // Find all the products with the productIds in the wishlist
    const products = await Product.findAll({
      where: {
        id: productIds,
      },
    });

    const result = products.map((product) => {
      return {
        name: product.dataValues.name,
        price: product.dataValues.price,
        image: product.dataValues.images,
      };
    });

    res.status(200).json({
      success: true,
      data: result,
    });

    // res.status(200).json({ status: 200, success: true, data: Allwishes });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
};
//clear  user wishes
export const clearWish = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const clearwishRequest = await Wishlist.destroy({
      where: {
        userId,
      },
    });

    res.status(201).send({
      status: 201,
      message: 'wishlist cleared successfully!',
      data: clearwishRequest,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: 'Error clearing items in wishlist',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};
//clear  user one wishes
export const clearOneWish = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const available = await Wishlist.findOne({
      where: {
        productId,
      },
    });

    if (!available) {
      res.status(400).send({
        status: 400,
        message: 'product not availble',
      });
    } else {
      const clearwishRequest = await Wishlist.destroy({
        where: {
          productId,
        },
      });
      res.status(201).send({
        status: 201,
        message: `product of Id :${productId} cleared succesfull`,
        data: clearwishRequest,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: 'Error clearing items in wishlist',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};
