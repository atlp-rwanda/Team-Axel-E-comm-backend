import { Request, Response } from 'express';
import User from '../database/models/User.model';
import * as twofactor from 'node-2fa';
import sendEmailToken from '../services/mails/sendEmailToken';
import { Role } from '../interfaces';

/*
  this middleware will enable two factor authentication on user account, create random code and send it to user through email and have to be verified to allow user access protected routes 
*/
export const create2FAToken = async (req: Request, res: Response) => {
  try {
    const newSecret = twofactor.generateSecret({
      name: 'Ecom-backend',
      account: req.user.surname,
    });

    const user = await User.findByPk(req.user.id);

    if (user?.role !== Role.Seller) {
      throw new Error(
        "Error: you are not a seller, you can't user this feature"
      );
    }
    const code = twofactor.generateToken(newSecret.secret);

    if (user && code && twofactor.verifyToken(newSecret.secret, code.token)) {
      await user.update({
        twoFAenabled: true,
        twoFAverified: false,
        secret: newSecret.secret,
      });
      res.send({ data: { ...newSecret, ...code }, statusCode: 200 });
      await sendEmailToken(user?.email, code?.token);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message, statusCode: 500 });
    }
  }
};
/*
  this middleware will verify the 2FA code sent to user after requesting the code or enabling two factor authentication 
 */
export const verify2FAToken = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (req.body.code && user?.secret) {
      if (twofactor.verifyToken(user.secret, req.body.code)) {
        await user.update({ twoFAverified: true });

        return res.status(200).json({ verified: true, statusCode: 200 });
      }

      return res.status(400).json({
        verified: false,
        statusCode: 400,
        message: 'request new code, your code expired',
      });
    }
    throw new Error(
      'please provide the code or enable two factor authentication on your account'
    );
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message, statusCode: 500 });
    }
  }
};
export const disableTwoFactorAuth = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user) {
      // await user.update({ twoFAenabled: false, secret: '' });
      user.twoFAenabled = false;
      user.secret = null;
      await user.save();
      return res.status(200).json({
        disabled: true,
        message: 'two factor authentication was disabled on your account',
        statusCode: 200,
      });
    }
    throw new Error('user with that email and password not found');
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message, statusCode: 500 });
    }
  }
};
