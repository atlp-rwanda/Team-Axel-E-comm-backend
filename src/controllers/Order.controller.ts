import { Request, Response } from "express";
import {
  createOrderService,
  getOrdersByUserService,
  clearOrdersService,
  getOrderStatusService,
  updatedOrderStatusService,
  getCartItemsService,
} from "../services";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const items = await getCartItemsService(userId);
    if (items.length === 0) {
      res.status(400).json({
        message: "No product available To make order",
        status: 400,
        success: false,
      });
    }
    const order = await createOrderService(userId, items);
    res.status(201).json({
      data: order,
      message: "Order created",
      status: 201,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error creating order",
        error: error.message,
      });
    }
  }
};

export const ViewOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUserService(userId);
    res.status(200).send({
      data: orders,
      status: 200,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Error while viewing",
        error: error.message,
      });
    } else {
      res.status(500).json({
        status: 500,
        success: false,
        message: "unexpected Error while getting order",
        error: error,
      });
    }
  }
};

export const clearOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const clearOrder = await clearOrdersService(userId);
    res.status(201).send({
      status: 201,
      message: "All Orders canceled successfully!",
      data: clearOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error while canceling order",
        error: error.message,
      });
    }
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const orderStatus = await getOrderStatusService(userId, orderId);
    res.status(200).json({
      data: orderStatus,
      status: 200,
      success: true,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Error retrieving order status",
        error: err.message,
      });
    } else {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error retrieving order status",
        error: err,
      });
    }
  }
};

// PUT request to update order status information
export const updatedOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;

    await updatedOrderStatusService(orderId, status);
    res.status(200).json({
      message: "status updated",
      status: 200,
      success: true,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error updating order status",
        error: err.message,
      });
    }
  }
};
