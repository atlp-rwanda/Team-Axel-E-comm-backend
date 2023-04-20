import { NextFunction, Request, Response } from "express";

export const asyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (error instanceof Error) {
        res.status(500).send({
          status: 500,
          success: false,
          error: error.name,
          message: error.message,
        });
      } else {
        console.log("Unexpected error", error);
      }
    });
  };
};
