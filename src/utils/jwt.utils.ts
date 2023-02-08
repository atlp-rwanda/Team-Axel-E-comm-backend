import * as JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

export class JwtUtility {
  static generateToken(userData: any): string {
    if (!process.env.SECRET_TOKEN) {
      throw new Error('SECRET_TOKEN environment variable not set');
    }
    return JWT.sign(userData, process.env.SECRET_TOKEN);
  }

  static verifyToken(token: string): any | Error {
    if (!process.env.SECRET_TOKEN) {
      throw new Error('SECRET_TOKEN environment variable not set');
    }
    return JWT.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
  }
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers['authorization'];
    if (!headers) throw new Error('No token was provided');
    const token = headers.split(' ')[1];

    try {
      const payload = JWT.verify(token, process.env.SECRET_TOKEN as string);
      req.user = payload;
      next();
    } catch (err) {
      res.status(400).json({
        success: false,
      });
    }
  }
}
