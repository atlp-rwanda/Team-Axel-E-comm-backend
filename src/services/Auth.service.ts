import nodemailer from 'nodemailer';
import User from '../database/models/User.model';
import { Status } from '../interfaces';

// Find one User
export const findOneUserByEmailService = async (email: string) => {
  const findOneUserRequest = await User.findOne({ where: { email } });
  return findOneUserRequest;
};

// find the user who has clicked the link.
export const findRegisteredUserService = async (confirmationCode: string) => {
  const currentUser = await User.findOne({ where: { confirmationCode } });
  return currentUser;
};

// confirm the user who clicked and update status
export const confirmUserService = async (confirmationCode: string) => {
  const confirmedUser = await User.update(
    { status: Status.Active },
    { where: { confirmationCode } }
  );
  return confirmedUser;
};
/*
 * Nodemailer to handle sending the email.
 */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});
