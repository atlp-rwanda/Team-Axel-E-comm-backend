import { getRoleService } from "../services/Role.service";
export const defaultRoleId = async () => {
  const buyerRole = await getRoleService("CUSTOMER");
  if (buyerRole) {
    return JSON.parse(JSON.stringify(buyerRole.id));
  } else {
    return null;
  }
};
