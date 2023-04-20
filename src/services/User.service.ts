import { Op } from "sequelize";
import User, { UserInstance } from "../database/models/User.model";
import { Status, UserAttributes } from "../interfaces";
import Role from "../database/models/Role.model";
import { getRoleByNameService } from "./Role.service";

export const findAllUsersService = async () => {
  const findUsersRequest = await User.findAll({
    include: Role,
  });
  return findUsersRequest;
};

export const createUserService = async (newUser: UserAttributes) => {
  const buyerRole = await getRoleByNameService("BUYER");
  if (!buyerRole) throw new Error("Buyer role not found");
  const userToCreate = { ...newUser, role: buyerRole.id };
  const createUserRequest = await User.create(userToCreate);
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

export const createInitialBuyerRole = async () => {
  const existingRole = await getRoleByNameService("BUYER");
  if (existingRole) return;
  await Role.create({
    role: "BUYER",
    routes: [
      "/api/v1/auth/logout",
      "/api/v1/auth/2fa",
      "/api/v1/auth/2fa/verify2FAToken",
      "/api/v1/auth/updatepassword",
      "/api/v1/cart",
      "/api/v1/cart/add",
      "/api/v1/cart/remove",
      "/api/v1/cart/clear",
      "/api/v1/cart/update",
      "/api/v1/chat",
      "/api/v1/checkout",
      "/api/v1/notification/all",
      "/api/v1/notification/read",
      "/api/v1/order",
      "/api/v1/order/get/all",
      "/api/v1/order/delete/all",
      "/api/v1/order/status",
      "/api/v1/productReview",
      "/api/v1/productReview/delete/all",
      "/api/v1/productReview/edit",
      "/api/v1/productReview/delete",
      "/api/v1/wishes",
      "/api/v1/wishes/all",
    ],
  });
};
