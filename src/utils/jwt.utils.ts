import * as JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
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
}
