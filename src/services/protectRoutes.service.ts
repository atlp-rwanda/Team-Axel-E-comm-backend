import { Request } from 'express';
import { TOKEN_EXPIRATION_TIME } from '../controllers/twoFactorAuth.controller';
import { AuthToken } from '../db/schemas/token.schema';
import { User } from '../db/schemas/user.schema';
import * as JWT from 'jsonwebtoken';

export const protectRoute = async (req: any, res: any, next: any) => {
  let token;
  const secret = process.env.SECRET_TOKEN as string;
  if (!req.headers.authorization?.startsWith('Bearer'))
    {return res.status(401).json({
      error: 'not authorized',
      statusCode: 401,
      success: false,
    });}

  try {
    token = req.headers.authorization.split(' ')[1];

    const decodedData: any = JWT.verify(token, secret);

    const user = await User.findByPk(decodedData.userId);
    if (!user) throw new Error('user not found');
    req.user = user.dataValues;

    const _2fa = '/api/v1/auth/2fa';
    const verify2fa = '/api/v1/auth/2fa/verify2FAToken';
    if (req.originalUrl === _2fa || req.originalUrl === verify2fa)
      {return next();}

    if (user.dataValues.twoFAenabled && user.dataValues.twoFAVerified)
      {return next();}
    if (!user?.dataValues.twoFAVerified && user.dataValues.twoFAenabled)
      {throw new Error('verify your otp code first');}

    if (user.dataValues.twoFAenabled) {
      const tokenData = await AuthToken.findOne({
        where: { user: user.dataValues.id.toString() },
      });

      const issueDate = tokenData?.dataValues.updatedAt;

      if (!(Date.now() - Date.parse(issueDate) < TOKEN_EXPIRATION_TIME))
        {throw new Error(
          '2fa code has expired [request new 2fa code and verify it]'
        );}
      return next();
    }

    next();
  } catch (err: any) {
    return res.status(401).json({
      error: err.message,
      statusCode: 401,
      success: false,
    });
  }
};
