import { Request, Response } from 'express';
import { Cart, Order } from '../models';

// here I want first of all to create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cartItem = await Cart.findAll({
      where: {
        userId,
      },
    });
    const items = cartItem.map((item) => item.dataValues.productId);
    if (items.length === 0) {
      return res
        .status(400)
        .json({ message: 'No product available To make order' });
    }
    const order = await Order.create({
      userId: userId,
      items: JSON.stringify(items),
    });
    res.status(201).json({
      message: 'Order created',
      orderData: order,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error creating order',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

export const ViewOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: {
        userId,
      },
    });

    res.status(200).send({
      status: 200,
      success: true,
      data: orders,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: 'Error viewing items in order',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

// clear the cart
export const clearOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const clearOrder = await Order.destroy({
      where: {
        userId,
      },
    });

    res.status(201).send({
      status: 201,
      message: 'All Order cancered successfully!',
      data: clearOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: 'Error cancering orders',
        error: error.message,
      });
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};

// GET request to retrieve order status information
export const getOrderStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const orderId = Number(req.params.orderId);

    const orders = await Order.findAll({
      where: {
        userId,
      },
    });

    const order = orders.find((ava) => ava.dataValues.id === orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If the order does not belong to the requesting buyer, return an error response
    if (order.dataValues.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to view this order status' });
    }

    const orderStatus = {
      currentStatus: order.dataValues.status,
      expectedDeliveryDate: order.dataValues.expectedDeliveryDate,
    };

    return res.status(200).json(orderStatus);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT request to update order status information
export const updatedOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const updatedOrder = await order.update({
      status: req.body.status,
    });
    const updatedOrderSt = {
      currentStatus: updatedOrder.dataValues.status,
      expectedDeliveryDate: updatedOrder.dataValues.expectedDeliveryDate,
    };
    return res.status(200).json({ message: 'status updated', updatedOrderSt });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
