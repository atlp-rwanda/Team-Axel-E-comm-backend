/*
 * This would be where the controller functions would be defined.
 * As the controller functions are ones directly interacting with the 'user',
 * we could try and be mindful of the response messages given back.
 * Here is a simple example of simple response that is wrapped in a try-catch block.
 *
 * 🛑 Note: this is an assumption that we a User schema, a findAllUsersService
 */

/* import { Request, Response } from 'express';
 import {
  findAllUsersService,
} from '../services';
import { User } from '../db/schemas';

// fetch all user from the db
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await findAllUsersService();
    res.status(200).json({ status: 200, success: true, data: allUsers });
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows error is Error
      console.log(
        ` 🔴 Error fetching users from the db: 😟 ${error.message}`,
      );
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};
 */
