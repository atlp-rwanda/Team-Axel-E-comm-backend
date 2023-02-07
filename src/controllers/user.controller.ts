import { Request, Response } from 'express';
import {
  findAllUsersService,
  createUserService,
  findOneUserService,
  sendEmailConfirmationRequest,
  findRegisteredUserService,
  confirmUserService,
  sendEmailConfirmationMessage,
  sendResetRequestEmail,
  sendPasswordResetConfirmation,
} from '../services/_index';
import { User } from '../db/schemas/_index';
import { JwtUtility } from '../utils/_index';
import { json } from 'sequelize';
import { send } from 'process';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await findAllUsersService();
    res.status(200).json({ status: 200, success: true, data: allUsers });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching users from the db: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log(`Unexpected error`, error);
    }
  }
};

// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    let newUser = req.body;
    // set unique token which will be the new user's confirmation code.
    const payload = {
      email: newUser.email,
    };
    const confirmationCode = JwtUtility.generateToken(payload);
    // check if this user already exists.
    const thisUserExists = await User.findOne({
      where: { email: newUser.email },
    });
    if (thisUserExists) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'This email is already registered',
      });
    } else {
      // update the user object and add the confirmationCode unique to their individual email.
      newUser = { ...newUser, confirmationCode };
      // create this user with that code.
      const createdUser = await createUserService(newUser);
      const userToken = JwtUtility.generateToken(newUser);
      res.status(201).json({
        status: 201,
        success: true,
        message: 'Successfully registered. Please check your email to confirm.',
        data: [createdUser, { token: userToken }],
      });
      sendEmailConfirmationRequest(
        newUser.email,
        newUser.surName,
        confirmationCode
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error creating user: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// Get one user from the db
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const wantedUser = req.params.id;
    const oneUser = await findOneUserService(wantedUser);
    if (oneUser) {
      res.status(200).json({ status: 200, success: true, data: oneUser });
    } else {
      res
        .status(404)
        .json({ status: 404, success: false, message: 'User not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching user: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// confirm user
export const confirmUser = async (req: Request, res: Response) => {
  try {
    const confirmationCode = req.params.confirmationCode;
    const currentUser = await findRegisteredUserService(confirmationCode);
    if (!currentUser) {
      res
        .status(404)
        .json({ status: 404, success: false, message: 'User not found' });
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
    const payload = {
      email: user.dataValues.email,
    };
    const resetToken = JwtUtility.generateToken(payload);
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
      const decodedToken = await JwtUtility.verifyToken(resetToken);

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
  // const resetToken = JwtUtility.verifyToken(req.params.token)
};

// // Reset Password
// export const resetPassword = async (userId, token, password) => {
//   let passwordResetToken = await Token.findOne({ userId });

//   if (!passwordResetToken) {
//     throw new Error('Invalid or expired password reset token');
//   }

//   console.log(passwordResetToken.token, token);

//   const isValid = await bcrypt.compare(token, passwordResetToken.token);

//   if (!isValid) {
//     throw new Error('Invalid or expired password reset token');
//   }

//   const hash = await bcrypt.hash(password, Number(bcryptSalt));

//   await User.updateOne(
//     { _id: userId },
//     { $set: { password: hash } },
//     { new: true },
//   );

//   const user = await User.findById({ _id: userId });

//   sendEmail(
//     user.email,
//     'Password Reset Successfully',
//     {
//       name: user.name,
//     },
//     './template/resetPassword.handlebars',
//   );

//   await passwordResetToken.deleteOne();

//   return { message: 'Password reset was successful' };
// };
