import User from '../database/models/User.model';
import Product from '../database/models/Product.model';
import { UserAttributes } from '../interfaces';

// Find all users
export const findAllUsersService = async () => {
  const findUsersRequest = await User.findAll();
  return findUsersRequest;
};

// Create one user
export const createUserService = async (newUser: UserAttributes) => {
  const createUserRequest = await User.create(newUser);
  return createUserRequest;
};

// Find one User
export const findOneUserService = async (userId: string) => {
  const findOneUserRequest = await User.findOne({ where: { id: userId } });
  return findOneUserRequest;
};

// Find one User by id
export const findOneUserByIdService = async (userId: number) => {
  const findOneUserRequest = await User.findByPk(userId);
  return findOneUserRequest;
};
