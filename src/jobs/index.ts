import { checkExpiredProducts } from "./checkExpiredProducts";

/*
 * this will register all cron jobs
 * ⚠️ excessive use of cron jobs can slow down your server
 * so use them wisely
 */

export const registerCronJobs = () => {
  //   testCron(5);
  //   testCron2();
  checkExpiredProducts();
};

export default registerCronJobs;
