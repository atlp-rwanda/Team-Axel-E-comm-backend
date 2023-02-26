import User, { UserAttributes } from '../database/models/User.model';

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

// Find one User by id
export const findOneUserByIdService = async (userId: string) => {
  const findOneUserRequest = await User.findByPk(userId); // ? does findByPk return only take an integer as an argument? If not, then is working as intended.
  return findOneUserRequest;
};
