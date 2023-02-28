import { CartAttributes } from '../interfaces';

/*
 * utility function to calculate the cart total
 * @param {CartAttributes[]} itemsInCart - the items in the cart
 * @returns {number} - the total amount in the cart
 */
export const calculateCartTotal = async (itemsInCart: CartAttributes[]) => {
  try {
    const items = await JSON.parse(JSON.stringify(itemsInCart));
    // iterate the items in cart and get the product details (we want the price)
    let cartTotal = 0;

    for (const item of items) {
      const itemTotal = item.Product.price * item.quantity;
      cartTotal += itemTotal;
    }

    if (!cartTotal) {
      throw new Error('Cart is empty');
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
