import { Router } from 'express';
import {
  createOrder,
  clearOrders,
  ViewOrders,
  getOrderStatus,
  updatedOrderStatus,
} from '../controllers';
import { isAdmin, isAuth } from '../middleware/auth';

const orderRouter = Router();

orderRouter.post('/', isAuth, createOrder); // create order
orderRouter.get('/all', isAuth, ViewOrders); // view all orders
orderRouter.delete('/alll', isAuth, clearOrders); // delete all orders
orderRouter.get('/status/:orderId', isAuth, getOrderStatus); //get order status
orderRouter.put('/status/:orderId', isAdmin, updatedOrderStatus); //updated order status
export default orderRouter;
