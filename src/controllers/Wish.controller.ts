import { Request, Response } from "express";
import {
  addToWishlist,
  getAllWishes,
  clearWish,
  clearOneWish,
} from "../services";

export const addWishlistItem = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const userId = req.user.id;
  try {
    const wishlistItem = await addToWishlist({ userId, productId });
    res.status(200).json({
      message: "Product added to wishlist",
      status: 200,
      success: true,
      data: wishlistItem,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Error while adding product to wishlist",
        error: error.message,
      });
    } else {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Unexpected Error while adding product to wishlist",
        error: error,
      });
    }
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const wishlist = await getAllWishes(userId);
    res.status(200).json({
      status: 200,
      success: true,
      data: wishlist,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Error while fetching wishlist",
        error: error.message,
      });
    }
  }
};

export const clearWishlist = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const clearWishlistResult = await clearWish(userId);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Wishlist cleared successfully",
      data: clearWishlistResult,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: 400,
        message: "Error clearing wishlist",
        error: error.message,
      });
    }
  }
};

export const clearOneWishlistItem = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const clearOneWishlistItemResult = await clearOneWish(productId);
    res.status(200).json({
      status: 200,
      success: true,
      message: "deleted successfully",
      data: clearOneWishlistItemResult,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Error clearing wishlist item",
        error: error.message,
      });
    }
  }
};
