/**
 * This job will check for expired products every day at 10:30 AM
 * and update their stock to "Expired"
 * @returns {Promise<void>} void
 *
 * ⚠️ I am only checking for products that are available, because if a product
 * is out of stock, it is not available to be purchased in the first place.
 * And also because if we happen to have very many products in the db,
 * this job will take a long time to run, and thus
 * it would be more efficient to only check for available products 🤷‍♂️
 */

import cron from "node-cron";
import { Stock } from "../interfaces";
import { getAvailableProductsService } from "../services";
import { sendExpiredProductNotice } from "../services/mail/sendExpiredProductNotice";

export const checkExpiredProducts = async (): Promise<void> => {
  cron.schedule(`16 12 * * *`, async () => {
    console.log(`📢 Checking for expired products every day at 🕥 10:50 AM...`);
    try {
      const availableProducts = await getAvailableProductsService();
      availableProducts.forEach(async (product) => {
        if (product.expiredAt) {
          if (product.expiredAt < new Date()) {
            product.stock = Stock.Expired;
            product.save();
            // TODO: Send an email to the seller to notify them that their product has expired
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
