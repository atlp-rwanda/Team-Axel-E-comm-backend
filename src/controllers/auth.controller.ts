import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { JwtUtility } from '../utils/jwt.utils';
import { findOneUserByEmailService } from '../services/_index';

//User Login
export const loginUser = async (req: Request, res: Response) => {
  /*
   *This following line didn't serve any purpose.
   * const secretKey = process.env.SECRET_KEY || 'secretKey';
   */
  const { email, password } = req.body;
  /*
   * Don't validate the input fields. The middleware will do it for us.
   * if (!email || !password) {
   * return res.status(400).send({ error: 'Email and password are required' });
   * }
   */

  try {
    // find if the the user exists by email
    const user = await findOneUserByEmailService(email);
    if (!user) {
      /*
       * Pay attention to the response messages you are sending.

       * This is a typical example of a 🟢 ✅successful response message
       * res.status(<code>).json({
       * status: <code>,
       * success: true,
       * data: <if there was data requested.>
       * })
       * 
       * 
       * This is a typical example of an 🔴 ❌ error response message
       * res.status(<code>).json({
       * status: <code>,
       * success: false,
       * message: <because we don't send data when there is an error>
       * })
       */
      res
        .status(401)
        .send({ status: 401, success: false, message: "Email doesn't exist" });
    } else {
      const passwordMatch = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (!passwordMatch) {
        /*
         * 🟠Remember to change these response messages.
         */
        res.status(401).send({
          status: 401,
          success: false,
          message: 'Password does not match given email',
        });
      } else {
        const token = JwtUtility.generateToken({ userId: user.dataValues.id });

        // Store the user's ID in the session
        req.session.userId = user.dataValues.id;

        /*
         * 🟠 Remember to write the conventional response messages.
         */
        res.status(200).json({ status: 200, success: true, data: token });
      }
    }
  } catch (error) {
    /*
     * This is typical example of how we are catching errors here.
     *
     */
    if (error instanceof Error) {
      res.status(500).send({
        status: 500,
        success: false,
        message: `Internal server error: ${error.message}`,
      });
    } else {
      console.log(`Something went  wrong when logging in: `, error);
    }
  }
};

// logOut User

export const logoutUser = async (req: Request, res: Response) => {
  // Clear the user's session
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({
        status: 500,
        success: false,
        message: `Internal server error: ${error}`,
      });
    } else {
      // Redirect the user to the login page
      /*
       *the re-direct link is not working.
       * For now we can leave just a res, but when we have a deployed API we can use that
       */
      //   res.redirect(
      //     `${process.env.CLIENT_URL as string}:${
      //       process.env.PORT as string
      //     }/api/v1/login`
      //   );
      return res.status(200).send({
        status: 200,
        success: true,
        message: `Logged Out Successfully`,
      });
    }
  });
};
