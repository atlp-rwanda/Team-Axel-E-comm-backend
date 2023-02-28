/**
 * utility function to calculate the cart total
 * @param {CartAttributes[]} itemsInCart - the items in the cart
 * @returns {number} - the total amount in the cart
 */

import { CartAttributes } from "../interfaces";
export const calculateCartTotal = async (itemsInCart: CartAttributes[]) => {
  try {
    const items = await JSON.parse(JSON.stringify(itemsInCart));
    // Infer the type of the product using property accessors
    type ProductType = (typeof items)[0]["Product"][0];

    const cartTotal = items.reduce(
      (acc: number, item: ProductType) =>
        acc + item.Product.price * item.quantity,
      0,
    );

    if (!cartTotal) {
      throw new Error("Cart is empty");
    }
    return cartTotal;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};
