import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

// This function will take an object schema as a paramater
export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(405).send(error.details[0].message);
    } else {
      next();
    }
  };
};
