import { checkExpiredPasswords } from "./checkExpiredPasswords";
import { checkExpiredProducts } from "./checkExpiredProducts";

export const registerCronJobs = () => {
  checkExpiredProducts();
  checkExpiredPasswords();
};

export default registerCronJobs;
