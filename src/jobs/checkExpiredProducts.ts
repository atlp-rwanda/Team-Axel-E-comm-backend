import cron from "node-cron";
import { Stock } from "../interfaces";
import { getAvailableProductsService } from "../services";
import { sendExpiredProductNotice } from "../services/mail";

export const checkExpiredProducts = async (): Promise<void> => {
  cron.schedule("30 17 * * *", async () => {
    console.log(`📢 Checking for expired products every day at 🕥 17:30...`);
    try {
      const availableProducts = await getAvailableProductsService();
      availableProducts.forEach(async (product) => {
        if (product.expiredAt) {
          if (product.expiredAt < new Date()) {
            product.stock = Stock.Expired;
            product.save();
            const { id, name, sellerId, quantity } = product;
            await sendExpiredProductNotice({ id, name, sellerId, quantity });
          }
        }
      });
      console.log(`🍏 Done checking for expired products.`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          `🍎 Error when checking expired products: ${error.message})`,
        );
      } else {
        console.log("🍎 Unexpected error in the expiration cron job", error);
      }
    }
  });
};
