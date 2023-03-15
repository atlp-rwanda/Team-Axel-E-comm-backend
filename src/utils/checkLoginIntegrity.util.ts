import { UserAttributes } from "../interfaces";

export const checkLoginIntegrity = async (user: UserAttributes) => {
  try {
    const { status } = user;
    switch (status) {
      case "Active":
        return true;
      case "Pending":
        throw new Error(
          "Please first head over to your email and confirm your registration",
        );
      case "Disabled":
        throw new Error(
          "Please contact our customer care, your account has been blocked",
        );
      case "Needs_Password_Reset":
        throw new Error(
          "Please first head over to your email and reset your password. It has expired",
        );
      default:
        throw new Error(
          "Something went wrong when checking your account status. Please contact support",
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
