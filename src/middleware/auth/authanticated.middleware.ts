import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils";
import { isValidUuid } from "../../utils";

export const AuthAndRoleChecker = (key: () => { value: string }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.status(401).send({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    } else {
      if (isValidUuid(key().value)) {
        const accessKey = key().value;
        try {
          const token = req.headers.authorization.split(" ")[1];
          const { id, given_name, surname, role } = (await verifyToken(token))
            .payload;

          req.user = {
            id,
            given_name,
            surname,
            role,
          };

          if (role === accessKey) next();
          else {
            return res.status(401).json({
              status: 401,
              success: false,
              message: "You are not allowed to perform this action!",
            });
          }
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).json({
              status: 500,
              success: false,
              message: "Error when verifying user",
              error: error.message,
            });
          } else {
            console.log(
              `Something went wrong when verifying the token: `,
              error,
            );
          }
        }
      } else {
        return res.status(400).json({
          status: 400,
          success: true,
          message: "Invalid access key",
        });
      }
    }
  };
};
