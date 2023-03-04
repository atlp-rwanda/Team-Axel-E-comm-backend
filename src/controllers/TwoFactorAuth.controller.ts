import { Request, Response } from "express";
import Token from "../database/models/Token.model";
import bcrypt from "bcryptjs";
import { transporter } from "../services";

export const create2FAToken = async (req: Request, res: Response) => {
  const code = Math.floor(
    Math.random() * (999999 - 100000) + 100000,
  ).toString();
  try {
    // await AuthToken.drop();
    // >>>> the following line must be uncomented after fininsihing authentication middlewares

    // if (!req.user) return res.redirect('/api/v1/login');

    // >>>> the above line must be uncomented after fininsihing authentication middlewares

    // >>>> the following lines must be removed after fininsihing authentication middlewares
    req.user = {
      id: "2",
    };
    // <<<< the above lines must be removed after fininsihing authentication middlewares
    /*
     *const previousToken = await AuthToken.destroy({
     *where: { user: req.user.id },
     *});
     */
    // console.log(previousToken);

    const salt = bcrypt.genSaltSync(10);
    const token = await bcrypt.hash(code, salt);
    const tokenData = {
      code: token,
      expire: (Date.now() + 1000 * 60 * 5).toString(),
      user: req.user.id,
    };
    /*
     *const data = await AuthToken.create(tokenData);
     */
    tokenData.code = code;
    await sendEmailToken("muslimuwitondanishema@gmail.com", code);
    res.send({ tokenData });
  } catch (error) {
    if (error instanceof Error) {
      res.send({ error: error.message });
    }
  }
};

export const verify2FAToken = async (req: Request, res: Response) => {
  // >>>> the following lines must be removed after fininsihing authentication middlewares
  req.user = {
    id: "2",
  };
  // <<<< the above lines must be removed after fininsihing authentication middlewares
  const tokenData = await Token.findOne({
    where: { userId: req.user.id },
  });
  console.log(tokenData?.dataValues, req.body);
  //   tokenData?.destroy()
  // const issuerDate = tokenData?.dataValues.updatedAt
  if (tokenData && req.body.code) {
    bcrypt.compare(
      req.body.code,
      tokenData?.dataValues.code,
      function (err, data) {
        if (err) throw new Error(err.message);
        res.user.verified = true;
        res.send({ verified: data });
      },
    );
  } else {
    res.redirect("/api/v1/login");
  }
};

async function sendEmailToken(email: string, code: string): Promise<void> {
  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: email,
    subject: "verification code",
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
