import { Request, Response } from "express";
import User from "../database/models/User.model";
import { generateToken } from "../utils";
import { verifyGoogleToken } from "../utils/verifyGoogleAuth.util";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (credential) {
      const { payload, error } = await verifyGoogleToken(credential);
      if (error || !payload) {
        return res.status(400).json({
          message: error,
          status: 400,
          success: false,
        });
      }

      const { email, given_name, family_name, picture } = payload;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "You are not registered. Please sign up",
        });
      }
      const token = await generateToken(user.dataValues.id, "1d");
      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: given_name,
          lastName: family_name,
          picture,
          email,
          token,
        },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message || error,
      });
    }
  }
};
