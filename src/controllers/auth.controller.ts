import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { JwtUtility } from '../utils/jwt.utils';
import { findOneUserByEmailService } from '../services/_index';

//User Login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // find if the the user exists by email
    const user = await findOneUserByEmailService(email);
    //console.log(user)
    if (!user) {
      res
        .status(401)
        .send({ status: 401, success: false, message: 'Email not exist' });
    } else {
      if (user.dataValues.status === 'Pending') {
        res.status(401).send({
          status: 401,
          success: false,
          message:
            'Please first head over to your email and confirm your registration',
        });
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          user.dataValues.password
        );
        if (!passwordMatch) {
          res.status(401).send({
            status: 401,
            success: false,
            message: 'Password does not match with email',
          });
        } else {
          const token = JwtUtility.generateToken({
            userId: user.dataValues.id,
          });
          // Store the user's ID in the session
          req.session.userId = user.dataValues.id;

          res.status(200).json({
            messages: 'Login successful ',
            status: 200,
            success: true,
            data: token,
          });
        }
      }
    }
  } catch (error) {
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
  console.log(req.session.userId);
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({
        status: 500,
        success: false,
        message: `Internal server error: ${error}`,
      });
    } else {
      return res.status(200).send({
        status: 200,
        success: true,
        message: `Logged Out Successfully`,
      });
    }
  });
};
