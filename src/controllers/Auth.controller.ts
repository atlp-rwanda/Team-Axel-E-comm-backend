import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { jwtUtility } from '../utils/jwt.utils';
import {
  confirmUserService,
  findOneUserByEmailService,
  findRegisteredUserService,
  sendEmailConfirmationMessage,
  sendPasswordResetConfirmation,
  sendResetRequestEmail,
} from '../services';
import { User } from '../models';

//User Login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // find if the the user exists by email
    const user = await findOneUserByEmailService(email);
    if (!user) {
      res.status(401).send({
        status: 401,
        success: false,
        message: 'User with this email does not exist',
      });
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
          const token = jwtUtility.generateToken(user.dataValues.id);
          // Store the user's ID in the session
          req.session.userId = user.dataValues.id;

          res.status(200).json({
            status: 200,
            success: true,
            message: 'Login successful ',
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

// confirm user
export const confirmUser = async (req: Request, res: Response) => {
  try {
    const confirmationCode = req.params.confirmationCode;
    const currentUser = await findRegisteredUserService(confirmationCode);
    if (!currentUser) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid Code: User not found who matches this code.',
      });
    } else {
      const confirmedUser = await confirmUserService(confirmationCode);
      sendEmailConfirmationMessage(
        currentUser.dataValues.email,
        currentUser.dataValues.surName
      );
      res.status(201).json({
        status: 201,
        success: true,
        data: confirmedUser,
        message: `User confirmed successfully.`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error confirming user: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};
// Request Password Reset
export const resetPasswordRequestController = async (
  req: Request,
  res: Response
) => {
  // const requestPasswordResetService = await requestPasswordResetService(
  //   req.body.email
  // );
  // return res.json(requestPasswordResetService);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    res
      .status(404)
      .json({ status: 404, success: false, message: 'Email does not exist' });
  } else {
    const resetToken = jwtUtility.generateToken(user.dataValues.email);
    const updateResetToken = await User.update(
      { resetToken: resetToken },
      { where: { email: req.body.email } }
    );
    if (updateResetToken[0] === 1) {
      res.status(200).json({
        status: 200,
        success: true,
        message: `Please check your email for the link to reset your password `,
      });
      sendResetRequestEmail(
        user.dataValues.email,
        user.dataValues.surName,
        resetToken
      );
    } else {
      res.status(505).json({
        status: 505,
        success: false,
        message: `Failed to update Reset token`,
      });
    }
  }
};
// Reset Password
export const resetPasswordController = async (req: Request, res: Response) => {
  const resetToken = req.params.token;
  const currentUser = await User.findOne({
    where: { resetToken },
  });

  if (!currentUser) {
    res.status(404).json({ status: 404, success: false, message: 'Forbidden' });
  } else {
    try {
      const decodedToken = await jwtUtility.verifyToken(resetToken);

      const updatedResponse = await User.update(
        { password: req.body.password },
        { where: { email: decodedToken.email } }
      );
      if (updatedResponse[0] === 1) {
        res.status(201).json({
          status: 201,
          success: true,
          message: 'Password reset successfully',
        });
        sendPasswordResetConfirmation(
          decodedToken.email,
          currentUser.dataValues.surName
        );
      } else {
        res.status(505).json({
          status: 505,
          success: false,
          message: 'Failed to reset password',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.json({
          success: false,
          message: `${error.message}`,
        });
      } else {
        console.log('Something went wrong', error);
      }
    }
  }
};
