import { User } from '../db/schemas/_index';
import { IUser } from '../interfaces/_index';

// Find all users
export const findALlUsersService = async () => {
  const findUsersRequest = await User.findAll();
  return findUsersRequest;
};

// Create one user
export const createUserService = async (newUser: IUser) => {
  const createUserRequest = await User.create(newUser);
  return createUserRequest;
};

// Find one User
export const findOneUserService = async (userId: string) => {
  const findOneUserRequest = await User.findOne({ where: { id: userId } });
  return findOneUserRequest;
};
