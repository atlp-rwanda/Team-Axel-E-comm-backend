import { Request, Response } from 'express';
import {
  addToCartService,
  clearCartService,
  deleteCartItemService,
  findProductService,
  isItemInCartService,
  viewCartService,
} from '../services';
import { isValidUUID } from '../utils';
import { CartAttributes } from '../interfaces';
import { calculateCartTotal } from '../utils';

// add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartItem = req.body as CartAttributes;
    // first check if the productId is a valid uuid
    if (!isValidUUID(cartItem.productId)) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid product id',
      });
    }
    // else if it is a valid uuid, proceed to add to cart
    else {
      const userId = req.user.id as string;
      // first find if the product exists
      const existingItem = await findProductService(cartItem.productId);
      if (!existingItem) {
        res.status(404).json({
          status: 404,
          success: false,
          message: 'Product not found',
        });
      }
      // if it does exist, proceed to add to cart
      else {
        // first check if the quantity is greater than the stock, and return error
        if (cartItem.quantity > existingItem.dataValues.quantity) {
          res.status(400).json({
            status: 400,
            success: false,
            message: 'Quantity exceeds stock',
          });
        } else {
          // first check if item is already in cart
          const alreadyInCart = await isItemInCartService(
            userId,
            cartItem.productId
          );
          // if not, add to cart
          if (!alreadyInCart) {
            const addedCartItem = await addToCartService({
              ...cartItem,
              userId,
            });
            res.status(201).json({
              status: 201,
              success: true,
              message: 'Item added to cart',
              data: addedCartItem,
            });
          }
          // else if it is already in the cart, tell the user that it is already in the cart
          else {
            res.status(400).json({
              status: 400,
              success: false,
              message: 'Item already in cart',
            });
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Error adding item to cart',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

// view items in cart
export const viewCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id as string;

    const itemsInCart = await viewCartService(userId);
    const cartTotal = await calculateCartTotal(itemsInCart);
    res.status(200).send({
      status: 200,
      success: true,
      data: { total: cartTotal, items: itemsInCart },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Error viewing items in cart',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

// remove an item from the cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const cartItemId = req.params.id;
    const removedItem = await deleteCartItemService(cartItemId);
    if (removedItem === 0) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Item not found in cart',
      });
    } else {
      res.status(200).send({
        status: 200,
        success: true,
        message: 'Item removed from cart',
        data: removedItem,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Error removing item from cart',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

// clear the cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const clearedCart = await clearCartService(userId);

    res.status(201).send({
      status: 201,
      message: 'Cart cleared successfully!',
      data: clearedCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Error clearing items in cart',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};
