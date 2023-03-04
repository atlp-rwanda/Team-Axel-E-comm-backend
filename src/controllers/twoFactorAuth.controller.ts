import { Request, Response } from "express";
import User from "../database/models/User.model";
import * as twofactor from "node-2fa";
import sendEmailToken from "../services/mails/sendEmailToken";

/*
  this middleware will enable two factor authentication on user account, create random code and send it to user through email and have to be verified to allow user access protected routes 
*/
export const create2FAToken = async (req: Request, res: Response) => {
  try {
    const newSecret = twofactor.generateSecret({
      name: "Ecom-backend",
      account: req.user.surname,
    });

    const user = await User.findByPk(req.user.id);

    const code = twofactor.generateToken(newSecret.secret);

    if (user && code && twofactor.verifyToken(newSecret.secret, code.token)) {
      await user.update({
        twoFAenabled: true,
        twoFAverified: false,
        secret: newSecret.secret,
      });
      res.send({ data: { ...newSecret, ...code }, status: 200 });
      await sendEmailToken(user.email, code.token);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message, status: 500 });
    }
  }
};
/*
  this middleware will verify the 2FA code sent to user after requesting the code or enabling two factor authentication 
 */
export const verify2FAToken = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (req.body.code && user && user.secret) {
      if (twofactor.verifyToken(user.secret, req.body.code)) {
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
