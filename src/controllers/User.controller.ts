import { Request, Response } from "express";
import {
  findAllUsersService,
  createUserService,
  findOneUserService,
  sendEmailConfirmationRequest,
} from "../services";
import User from "../database/models/User.model";
import { jwtUtility } from "../utils";

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

    const confirmationCode = jwtUtility.generateToken(newUser.email);
    // check if this user already exists.
    const thisUserExists = await User.findOne({
      where: { email: newUser.email },
    });
    if (thisUserExists) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "This email is already registered",
      });
    } else {
      // update the user object and add the confirmationCode unique to their individual email.
      newUser = { ...newUser, confirmationCode };
      // create this user with that code.
      const createdUser = await createUserService(newUser);
      const userToken = jwtUtility.generateToken(newUser);
      res.status(201).json({
        status: 201,
        success: true,
        message: "Successfully registered. Please check your email to confirm.",
        data: [createdUser, { token: userToken }],
      });
      sendEmailConfirmationRequest(
        newUser.email,
        newUser.surname,
        confirmationCode,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error creating user: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log("Unexpected error", error);
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
        .json({ status: 404, success: false, message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching user: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log("Unexpected error", error);
    }
  }
};
