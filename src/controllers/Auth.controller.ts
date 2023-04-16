import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { checkLoginIntegrity, generateToken, verifyToken } from "../utils";
import {
  confirmUserService,
  findOneUserByEmailService,
  findRegisteredUserService,
  sendEmailConfirmationMessage,
  sendPasswordResetConfirmation,
  sendResetRequestEmail,
} from "../services";
import User from "../database/models/User.model";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginError = "🚨 Invalid credentials";

    const { email, password } = req.body;

    const user = await findOneUserByEmailService(email);

    if (!user) throw new Error(loginError);

    const {
      id,
      role,
      given_name,
      surname,
      password: hashedPassword,
      avatar,
    } = user.dataValues;

    await checkLoginIntegrity(user.dataValues);

    const pwdMatch = await bcrypt.compare(password, hashedPassword);
    if (!pwdMatch) throw new Error(loginError);

    const token = await generateToken({
      id,
      role,
      given_name,
      surname,
      avatar,
      email,
    });

    req.session.userId = user.dataValues.id;

    user.twoFAverified = false;
    await user.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login successful ",
      data: token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).send({
        status: 403,
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: 500,
        success: false,
        message: error,
      });
    }
  }
};

// logOut User

export const logoutUser = async (req: Request, res: Response) => {
  // Clear the user's session
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({
        status: 500,
        success: false,
        message: `Internal server error: ${error}`,
      });
    } else {
      return res.status(200).send({
        status: 200,
        success: true,
        message: `Logged Out Successfully`,
      });
    }
  });
};

// confirm user
export const confirmUser = async (req: Request, res: Response) => {
  try {
    const confirmationCode = req.params.confirmationCode;
    const currentUser = await findRegisteredUserService(confirmationCode);
    if (!currentUser) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid Code: User not found who matches this code.",
      });
    } else {
      await confirmUserService(confirmationCode);
      sendEmailConfirmationMessage(
        currentUser.dataValues.email,
        currentUser.dataValues.surname,
      );
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error confirming user: ${error.message}`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log("Unexpected error", error);
    }
  }
};
// Request Password Reset
export const resetPasswordRequestController = async (
  req: Request,
  res: Response,
) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    res
      .status(404)
      .json({ status: 404, success: false, message: "Email does not exist" });
  } else {
    const { id, role, given_name, surname, avatar, email } = user.dataValues;
    const resetToken = await generateToken(
      {
        id,
        role,
        given_name,
        surname,
        avatar,
        email,
      },
      "5m",
    );
    const updateResetToken = await User.update(
      { resetToken: resetToken },
      { where: { email: req.body.email } },
    );
    if (updateResetToken[0] === 1) {
      res.status(200).json({
        status: 200,
        success: true,
        message: `Please check your email for the link to reset your password `,
      });
      sendResetRequestEmail(
        user.dataValues.email,
        user.dataValues.surname,
        resetToken,
      );
    } else {
      res.status(505).json({
        status: 505,
        success: false,
        message: `Failed to update Reset token`,
      });
    }
  }
};
// Reset Password
export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const resetToken = req.params.token;
    const currentUser = await User.findOne({
      where: { resetToken },
    });
    if (!currentUser) {
      res
        .status(404)
        .json({ status: 404, success: false, message: "Forbidden" });
    } else {
      const decodedToken = await verifyToken(resetToken);
      const updatedResponse = await User.update(
        { password: req.body.password, resetToken: "" },
        { where: { email: decodedToken.payload.email } },
      );
      if (updatedResponse[0] === 1) {
        res.status(201).json({
          status: 201,
          success: true,
          message: "Password reset successfully",
        });
        sendPasswordResetConfirmation(
          decodedToken.payload.email,
          currentUser.dataValues.surname,
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        success: false,
        message: `${error.message}`,
      });
    } else {
      console.log("Something went wrong", error);
    }
  }
};
