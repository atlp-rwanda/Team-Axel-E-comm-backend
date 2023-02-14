import { Request, Response } from 'express';
import {
  addToCartService,
  clearCartService,
  viewCartService,
} from '../services';

// add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartItem = req.body;
    const userId = req.user.id;
    const addedCartItem = await addToCartService({ ...cartItem, userId });

    res.status(201).json({
      message: 'Item added to cart',
      addedCartItem,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
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
    // ! This failed for some reason, but was the most meaningful way to get a user
    // const userId = req.session.userId;

    const userId = req.user.id;
    const itemsInCart = await viewCartService(userId as string);

    res.status(200).send({
      status: 200,
      success: true,
      data: itemsInCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: 'Error viewing items in cart',
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
        message: 'Error clearing items in cart',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

// calculate cart total
// export const calculateCartTotal = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const cartItems = await viewCartService(userId);
//     let cartTotal = 0;
//     for (const item of cartItems) {
//       const product = await Product.findByPk(item.productId);
//       // or
//        const product = await getProductService(item.productId);
//       const itemTotal = product.price * item.quantity;
//       cartTotal += itemTotal;
//     }
//     res.status(200).json({
//       status: 200,
//       success: true,
//       message: `🍏 Calculated total is: `,
//       data: cartTotal,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.json({
//         success: false,
//         message: `🍎 Something went wrong when calculating the total: ${error.message}`,
//       });
//     } else console.log(`🍎 Something went wrong: `, error);
//   }
// };
