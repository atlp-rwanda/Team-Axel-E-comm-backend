import * as JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import { IPayload } from "../interfaces";
dotenv.config();

export class jwtUtility {
  static generateToken(userData: string): string {
    if (!process.env.SECRET_TOKEN) {
      throw new Error("SECRET_TOKEN environment variable not set");
    }
    return JWT.sign(userData, process.env.SECRET_TOKEN);
  }

  static verifyToken(token: string): any | Error {
    if (!process.env.SECRET_TOKEN) {
      throw new Error("SECRET_TOKEN environment variable not set");
    }
    return JWT.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
  }
}
