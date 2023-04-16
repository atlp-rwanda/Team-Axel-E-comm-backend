import { getAllRolesService } from "../services/Role.service";

export function getAccessKeys(
  callback: (Keys: Record<string, string>) => void,
) {
  let ADMIN_ACCESSKEY = "";
  let MERCHANT_ACCESSKEY = "";
  let CUSTOMER_ACCESSKEY = "";

  getAllRolesService()
    .then((roles) => {
      roles.forEach((OneRole) => {
        innerloop: switch (OneRole.role) {
          case "ADMIN":
            ADMIN_ACCESSKEY = OneRole.id;
            break innerloop;
          case "MERCHANT":
            MERCHANT_ACCESSKEY = OneRole.id;
            break innerloop;
          case "CUSTOMER":
            CUSTOMER_ACCESSKEY = OneRole.id;
            break innerloop;
        }
      });
      callback({ ADMIN_ACCESSKEY, MERCHANT_ACCESSKEY, CUSTOMER_ACCESSKEY });
    })
    .catch((err) => {
      console.error("Error fetching access keys:", err);
      callback({});
    });
}
