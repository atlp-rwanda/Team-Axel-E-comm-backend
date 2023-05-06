import { Request, Response } from "express";
import {
  findAllUsersService,
  createUserService,
  findOneUserService,
  sendEmailConfirmationRequest,
  updateUserService,
} from "../services";
import User from "../database/models/User.model";
import { generateToken } from "../utils";

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
    const email = req.body.email;
    // set unique token which will be the new user's confirmation code.

    const confirmationCode = await generateToken(email);
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
      const userData = {
        name: createdUser.surname,
        email: createdUser.email,
        confirmationCode: createdUser.confirmationCode,
      };

      await User.update(
        { lastPasswordUpdate: new Date() },
        { where: { email: email } },
      );

      res.status(201).json({
        status: 201,
        success: true,
        message: "Successfully registered. Please check your email to confirm.",
        data: [userData],
      });
      await sendEmailConfirmationRequest(
        newUser.email,
        newUser.surName,
        confirmationCode,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error creating user: ${error.message}`);
      console.log(error);

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

// update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await updateUserService(userId, updatedUserData);
    res.status(200).json({ status: 200, success: true, data: updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ status: 500, success: false, message: error.message });
    } else {
      console.log("Unexpected error", error);
    }
  }
};
