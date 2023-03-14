import cron from "node-cron";
import {
  findUsersWithExpiredPasswords,
  updateUsersStatusWhoNeedsPasswordReset,
} from "../services";
import { sendExpiredPasswordNotices } from "../services/mail/sendExpiredPasswordNotices";

export const checkExpiredPasswords = async (): Promise<void> => {
  // This cron schedule runs at 17:30 on the 1st day of every 3rd month,
  // which is equivalent to running every 90 days on the first day of the month.
  cron.schedule("30 17 1 */3 *", async () => {
    const currentDate = new Date();
    console.log(
      `🔖 Log: ${currentDate}: 📢 Checking for expired passwords every 90 days at 🕥 17:30...`,
    );
    try {
      const expiredUsers = await findUsersWithExpiredPasswords();
      if (expiredUsers.length) {
        await Promise.all([
          updateUsersStatusWhoNeedsPasswordReset(expiredUsers),
          sendExpiredPasswordNotices(expiredUsers),
        ]);
      }

      console.log(`🍏 Done checking for expired passwords.`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          `🍎 Error when checking expired passwords: ${error.message})`,
        );
      } else {
        console.log("🍎 Unexpected error in the expiration cron job", error);
      }
    }
  });
};
