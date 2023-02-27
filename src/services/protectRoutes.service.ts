import { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';
import User from '../database/models/User.model';

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  const secret = process.env.SECRET_TOKEN as string;
  if (!req.headers.authorization?.startsWith('Bearer')) {
    return res.status(401).json({
      error: 'not authorized',
      statusCode: 401,
      success: false,
    });
  }

  try {
    token = req.headers.authorization.split(' ')[1];

    const decodedData = JWT.verify(token, secret);

    const user = await User.findByPk(decodedData.toString());

    if (!user) throw new Error('user not found');
    req.user = user.dataValues;

    const origins = [
      '/api/v1/auth/2fa',
      '/api/v1/auth/2fa/disable',
      '/api/v1/auth/2fa/verify2FAToken',
    ];
    if (origins.includes(req.originalUrl)) {
      return next();
    }

    if (user.twoFAenabled) {
      if (user.twoFAverified) {
        return next();
      }
      return res.status(400).json({
        verified: false,
        statusCode: 400,
        message: 'please verify your code sent to yuor email',
      });
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({
        error: err.message,
        statusCode: 401,
        success: false,
      });
    }
  }
};
