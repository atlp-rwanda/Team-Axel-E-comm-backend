/**
 * This job checks if the user's password has been updated in the last 90 days.
 * If not, it sends an email to the user to remind him to update his password.
 * The job is scheduled to run every day at 8:00 AM.
 */

import cron from "node-cron";
import { findAllUsersService } from "../services";
import { Status } from "../interfaces";

export const checkLastPasswordUpdate = async (): Promise<void> => {
  cron.schedule(`0 8 * * *`, async () => {
    console.log(`📢 Checking for users who have not updated their password...`);
    try {
      const users = await findAllUsersService();
      users.forEach(async (user) => {
        if (user.lastPasswordUpdate) {
          if (user.lastPasswordUpdate < new Date()) {
            user.status = Status.Inactive;
            user.save();
            // TODO: Send an email to the user to remind him to update his password
          }
        }
      });
      console.log(
        `🍏 Done checking for users who have not updated their password.`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          `🍎 Error when checking for users who have not updated their password: ${error.message})`,
        );
      } else {
        console.log("🍎 Unexpected error in the expiration cron job", error);
      }
    }
  });
};
