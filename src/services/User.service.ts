import { Op } from "sequelize";
import User, { UserInstance } from "../database/models/User.model";
import { Status, UserAttributes } from "../interfaces";

export const findAllUsersService = async () => {
  const findUsersRequest = await User.findAll();
  return findUsersRequest;
};

export const createUserService = async (newUser: UserAttributes) => {
  const createUserRequest = await User.create(newUser);
  return createUserRequest;
};

export const findOneUserService = async (userId: string) => {
  const findOneUserRequest = await User.findOne({ where: { id: userId } });
  return findOneUserRequest;
};

export const findOneUserByIdService = async (userId: string) => {
  const findOneUserRequest = await User.findByPk(userId);
  return findOneUserRequest;
};

export const findUsersWithExpiredPasswords = async () => {
  const findUsersRequest = await User.findAll({
    where: {
      lastPasswordUpdate: {
        [Op.lt]: new Date(),
      },
    },
  });
  return findUsersRequest;
};

export const updateUsersStatusWhoNeedsPasswordReset = async (
  users: UserInstance[],
) => {
  const updateUsersRequest = await Promise.all(
    users.map(async (user) => {
      user.status = Status.Needs_Password_Reset;
      await user.save();
    }),
  );
  return updateUsersRequest;
};

export const updateUserService = async (
  userId: string,
  updatedUserData: UserAttributes,
) => {
  const [affectedCount, affectedRows] = await User.update(updatedUserData, {
    where: {
      id: userId,
    },
    returning: true,
  });
  if (affectedCount !== 1) {
    throw new Error(`Failed to update user with id ${userId}`);
  }
  return affectedRows[0];
};
