import Cart from '../database/models/Cart.model';
import Product from '../database/models/Product.model';
import { CartAttributes } from '../interfaces';

// add to cart service
export const addToCartService = async (cartItem: CartAttributes) => {
  const addToCartRequest = await Cart.create(cartItem);
  return addToCartRequest;
};

// is item already in cart
export const isItemInCartService = async (
  userId: string,
  productId: string
) => {
  const isItemInCartRequest = await Cart.findOne({
    where: {
      userId,
      productId,
    },
  });
  return !!isItemInCartRequest;
};

// update cart item quantity
// TODO: check if item is already in cart
// TODO: check if quantity is greater than stock
/*
 * @Fabrice, I left this here to be mindful of that. Delete these after you are done
 */
export const updateCartItemQuantityService = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const updateCartItemQuantityRequest = await Cart.update(
    { quantity },
    {
      where: {
        userId,
        productId,
      },
    }
  );

  return updateCartItemQuantityRequest;
};

// view cart service
export const viewCartService = async (userId: string) => {
  const viewCartRequest = await Cart.findAll({
    where: {
      userId,
    },
    include: Product,
  });
  return viewCartRequest;
};

// delete cart item
export const deleteCartItemService = async (cartItemId: string) => {
  const deleteCartItemRequest = await Cart.destroy({
    where: {
      id: cartItemId,
    },
  });
  return deleteCartItemRequest;
};

// clear cart
export const clearCartService = async (userId: string) => {
  const clearCartRequest = await Cart.destroy({
    where: {
      userId,
    },
  });
  return clearCartRequest;
};
