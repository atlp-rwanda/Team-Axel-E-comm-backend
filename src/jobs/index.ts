import { checkExpiredProducts } from "./checkExpiredProducts";

export const registerCronJobs = () => {
  checkExpiredProducts();
};

export default registerCronJobs;
