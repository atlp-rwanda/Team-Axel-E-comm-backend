import cron from "node-cron";
import { Status } from "../interfaces";
import { findAllUsersService } from "../services";
import { sendExpiredPasswordNotice } from "../services/mail/sendExpiredPasswordNotice";

export const checkExpiredPasswords = async (): Promise<void> => {
  cron.schedule("30 17 */90 * *", async () => {
    const currentDate = new Date();
    console.log(
      `🔖 Log: ${currentDate}: 📢 Checking for expired passwords every 90 days at 🕥 17:30...`,
    );
    try {
      const users = await findAllUsersService();
      users.forEach(async (user) => {
        if (user.lastPasswordUpdate) {
          if (user.lastPasswordUpdate < new Date()) {
            user.status = Status.Needs_Pwd_Reset;
            user.save();
            const { surname, given_name, email } = user;
            await sendExpiredPasswordNotice({ surname, given_name, email });
          }
        }
      });
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
