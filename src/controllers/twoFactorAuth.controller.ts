import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// import { AuthToken, User } from '../db/models';
import { transporter } from '../services';
import { AuthToken, User } from '../models';
export const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 60 * 24 * 3;
export const create2FAToken = async (req: Request, res: Response) => {
  const code = Math.floor(
    Math.random() * (999999 - 100000) + 100000
  ).toString();
  try {
    const user = await User.findByPk(req.user.id);
    if (user) {
      await user.update({ twoFAenabled: true, twoFAVerified: false });
    }
    const salt = bcrypt.genSaltSync(8);
    const token = bcrypt.hashSync(code, salt);
    const tokenData = {
      code: token,
      expire: (Date.now() + TOKEN_EXPIRATION_TIME).toString(),
      user: req.user.id,
    };
    await AuthToken.create(tokenData);
    tokenData.code = code;
    console.log(user?.dataValues.email);

    await sendEmailToken(user?.dataValues.email, code);
    res.send({ tokenData });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
export const verify2FAToken = async (req: Request, res: Response) => {
  try {
    const tokenData = await AuthToken.findOne({
      where: { user: req.user.id.toString() },
    });
    const user = await User.findByPk(req.user.id);

    const issueDate = tokenData?.dataValues.updatedAt;

    if (
      user &&
      tokenData &&
      req.body.code &&
      Date.now() - Date.parse(issueDate) < TOKEN_EXPIRATION_TIME
    ) {
      if (bcrypt.compareSync(req.body.code, tokenData.dataValues.code)) {
        return await user.update({ twoFAVerified: true }).then(() => {
          res.send({ verified: true });
        });
      }
    }

    res.status(401).send({
      message: 'code not found',
      statusCode: 401,
      success: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      statusCode: 500,
      success: false,
    });
  }
};

async function sendEmailToken(email: string, code: string): Promise<void> {
  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: email,
    subject: 'verification code',
    text: `Hi \n\n you login verification code is ${code}!\n\n`,
    html: `
      
        <p>use the following code to log in you account <strong>${code}</strong></p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error instanceof Error) {
      console.error(` 🚗 Error sending mail: ${error.message}`);
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
}
