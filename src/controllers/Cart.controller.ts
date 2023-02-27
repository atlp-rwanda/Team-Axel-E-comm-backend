import { Request, Response } from 'express';
import { ICart, IProduct } from '../interfaces';
import {
  addToCartService,
  clearCartService,
  getAllItemsServices,
  getAvailableProductsService,
  updateCartService,
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
    console.log('The user ID is as follow: ', req.user);
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

// Update a cart product
export const updateCart = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.id;
    console.log('The user ID is as follow in cart updateee: ', req.user.id);
    const userId: string = req.user.id;
    console.log('The viewCard is Entered');
    const userCart = await viewCartService(userId as string);
    console.log('The viewCard is Exited');
    if (userCart) {
      console.log('User cart is available.', userCart);
      const parsedUserCart = await JSON.parse(JSON.stringify(userCart));
      console.log('The user cart is parsed :', parsedUserCart);
      console.log(
        'The ids are: ',
        parsedUserCart[0].productId,
        parseInt(productId)
      );

      console.log(typeof parsedUserCart.productId, typeof parseInt(productId));

      for (let index = 0; index < parsedUserCart.length; index++) {
        if (parsedUserCart[index].productId == parseInt(productId)) {
          console.log('The productIds are equal!!!!');
          const deleteCartProduct = await updateCartService(productId, userId);
          console.log('The updateCartService is exited!!!');
          console.log(
            'The deleted product count is this ::::::::::::::',
            deleteCartProduct
          );

          // Total price calculations
          let totalPrice = 0;

          const updatedUserCart = await viewCartService(userId as string);
          const parsedUpdatedUserCart = await JSON.parse(
            JSON.stringify(updatedUserCart)
          );

          const allProducts = await getAllItemsServices();
          const parsedAllProducts = await JSON.parse(
            JSON.stringify(allProducts)
          );

          for (let i = 0; i < parsedUpdatedUserCart.length; i++) {
            let cartProduct: any;
            for (cartProduct in parsedUpdatedUserCart[i]) {
              for (let j = 0; j < parsedAllProducts.length; j++) {
                let product: any;
                for (product in parsedAllProducts[j]) {
                  if (cartProduct.productId === product.id) {
                    totalPrice += product.price;
                  }
                }
              }
            }
          }

          // return cart total price
          return res.status(200).json({
            statuscode: 200,
            success: true,
            data: [
              parsedUpdatedUserCart,
              'Now your cart total price is ' + totalPrice,
            ],
          });
        }
      }
    } else {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        data: 'Internal Server Error',
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error occur while updating your cart',
        error: error.message,
      });
      console.log('The error description is :', error);
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
