import { Request, Response } from "express";
import User from "../database/models/User.model";
import * as twofactor from "node-2fa";
import sendEmailToken from "../services/mail/sendEmailToken";

export const create2FAToken = async (req: Request, res: Response) => {
  try {
    const { id, surname } = req.user;
    const { secret } = twofactor.generateSecret({
      name: "Ecom-backend",
      account: surname,
    });

    const user = await User.findByPk(id);

    const code = twofactor.generateToken(secret);

    if (user && code) {
      const { token } = code;
      await user.update({
        twoFAenabled: true,
        twoFAverified: false,
        secret: secret,
      });
      await sendEmailToken(user.email, token);
      res.send({ data: { secret, token }, status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message, status: 500 });
    }
  }
};

export const verify2FAToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { code } = req.body;
    const user = await User.findByPk(id);
    if (code && user && user.secret) {
      if (twofactor.verifyToken(user.secret, code)) {
        await user.update({ twoFAverified: true });

        return res.status(200).json({ verified: true, status: 200 });
      }

      return res.status(400).json({
        verified: false,
        status: 400,
        message: "request new code, your code expired",
      });
    }
    throw new Error(
      "please provide the code or enable two factor authentication on your account",
    );
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message, status: 500 });
    }
  }
};
