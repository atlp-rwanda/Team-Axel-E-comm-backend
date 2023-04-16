import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserAttributes } from "../interfaces";

dotenv.config();

type IReturn = {
  payload: UserAttributes;
  iat: number;
  exp: number;
};

const secretToken = process.env.SECRET_TOKEN as string;
if (!secretToken) {
  throw new Error("SECRET_TOKEN environment variable not set");
}

async function generateToken<T>(payload: T, date?: string): Promise<string> {
  if (!date) {
    date = "1d";
  }
  return jwt.sign({ payload }, secretToken, { expiresIn: `${date}` });
}

async function verifyToken(token: string): Promise<IReturn> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretToken, (err, decoded) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        if (!decoded) {
          reject(new Error("No decoded token"));
        }
        return resolve(decoded as IReturn);
      }
    });
  });
}

export { generateToken, verifyToken };
