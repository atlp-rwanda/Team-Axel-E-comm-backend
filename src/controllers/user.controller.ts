import { Request, Response } from 'express';
import {
  findAllUsersService,
  createUserService,
  findOneUserService,
  sendEmailConfirmationRequest,
  findRegisteredUserService,
  confirmUserService,
  sendEmailConfirmationMessage,
} from '../services/_index';
import { User } from '../db/schemas/_index';
import { JwtUtility } from '../utils/index';

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
      res
        .status(201)
        .json({
          status: 201,
          success: true,
          message: 'Successfully registered',
          data: [createdUser, { token: userToken }],
        });
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
