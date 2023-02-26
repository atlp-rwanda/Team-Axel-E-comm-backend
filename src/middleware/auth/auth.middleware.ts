import { NextFunction, Request, Response } from 'express';
import { jwtUtility } from '../../utils';
import { findOneUserByIdService } from '../../services';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if there is a user in the req
  if (!req.headers.authorization) {
    res
      .status(401)
      .send({ status: 401, success: false, message: 'You are not logged in' });
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedData = jwtUtility.verifyToken(token);
      const currentUser = await findOneUserByIdService(decodedData);
      if (!currentUser) {
        res.status(403).json({
          statusCode: 403,
          success: false,
          message: 'Unauthorized access. User not found',
        });
      } else {
        req.user = currentUser?.dataValues; // is this right koko?
        next();
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          status: 500,
          success: false,
          message: `Error verifying token`,
          error: error.message,
        });
      } else {
        console.log(`Something went wrong when verifying the token: `, error);
      }
    }
  }
};

export const isSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if the user is a seller
    const currentUserStatus = req.user.role;
    if (currentUserStatus !== 'Seller') {
      res.status(403).json({
        status: 403,
        success: false,
        message: 'Unauthorized access. You are not a seller',
      });
    } else {
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: `Error verifying user status`,
        error: error.message,
      });
    } else {
      console.log(`Something went wrong when verifying user status: `, error);
    }
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if the user is an admin
    const currentUserStatus = req.user.role;
    if (currentUserStatus !== 'Admin') {
      res.status(403).json({
        status: 403,
        success: false,
        message: 'Unauthorized access. You are not an admin',
      });
    } else {
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: `Error verifying user status`,
        error: error.message,
      });
    } else {
      console.log(`Something went wrong when verifying user status: `, error);
    }
  }
};
