import Cart from "../database/models/Cart.model";
import Order from "../database/models/Order.model";

// To create order
export const createOrderService = async (userId: string, items: string[]) => {
  const order = await Order.create({
    userId,
    items: JSON.stringify(items),
  });
  return order;
};

export const getOrdersByUserService = async (userId: string) => {
  const orders = await Order.findAll({
    where: {
      userId,
    },
  });
  return orders;
};

// clear the orders
export const clearOrdersService = async (userId: string) => {
  const clearOrder = await Order.destroy({
    where: {
      userId,
    },
  });
  return clearOrder;
};

export const getOrderStatusService = async (
  userId: string,
  orderId: string,
): Promise<{ currentStatus: string; expectedDeliveryDate: Date }> => {
  const orders = await Order.findAll({
    where: {
      userId,
    },
  });
  const order = orders.find((ava) => ava.dataValues.id === orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  const orderStatus = {
    currentStatus: order.dataValues.status,
    expectedDeliveryDate: order.dataValues.expectedDeliveryDate,
  };
  return orderStatus;
};

// PUT request to update order status information
export const updatedOrderStatusService = async (
  orderId: string,
  status: string,
): Promise<{ currentStatus: string; expectedDeliveryDate: Date }> => {
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  const updatedOrder = await order.update({
    status,
  });
  const updatedOrderSt = {
    currentStatus: updatedOrder.dataValues.status,
    expectedDeliveryDate: updatedOrder.dataValues.expectedDeliveryDate,
  };
  return updatedOrderSt;
};

export const getCartItemsService = async (
  userId: string,
): Promise<string[]> => {
  const cartItems = await Cart.findAll({
    where: {
      userId,
    },
  });
  const items = cartItems.map((item) => item.dataValues.productId);
  return items;
};
