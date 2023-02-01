import { Request, Response } from 'express';
import {
  findALlUsersService,
  createUserService,
  findOneUserService,
} from '../services/_index';
import { User } from '../db/schemas/_index';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await findALlUsersService();
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const thisUserExists = await User.findOne({
      where: { email: newUser.email },
    });
    if (thisUserExists) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'This email is already in use',
      });
    } else {
      const createdUser = await createUserService(newUser);
      res.status(201).json({ status: 201, success: true, data: createdUser });
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
