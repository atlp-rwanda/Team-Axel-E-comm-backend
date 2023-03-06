import Product from "../database/models/Product.model";
import Wishlist from "../database/models/Wishes.model";
import { WishListIteminterface } from "../interfaces";

export const addToWishlist = async (wishlistItem: WishListIteminterface) => {
  const { userId, productId } = wishlistItem;

  const product = await Product.findOne({ where: { id: productId } });
  if (!product) {
    throw new Error(`🍎 Product with id ${productId} not found`);
  }
  // Check if the product is already in the wishlist
  const isProductInWishlist = await Wishlist.findOne({
    where: { userId: userId, productId: productId },
  });
  if (isProductInWishlist) {
    throw new Error(
      `🍎 Product with id ${productId} is already in the wishlist`,
    );
  } else {
    // Add the product to the wishlist
    const wishes = await Wishlist.create({ userId, productId });
    return wishes;
  }
};

export const getAllWishes = async (userId: string) => {
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

  return result;
};

export const clearWish = async (userId: string) => {
  const clearwishRequest = await Wishlist.destroy({
    where: {
      userId,
    },
  });

  return clearwishRequest;
};

export const clearOneWish = async (productId: string) => {
  const available = await Wishlist.findOne({
    where: {
      productId,
    },
  });

  if (!available) {
    throw new Error(`🍎 Product with id ${productId} not found in wishlist`);
  } else {
    const clearwishRequest = await Wishlist.destroy({
      where: {
        productId,
      },
    });
    return clearwishRequest;
  }
};
