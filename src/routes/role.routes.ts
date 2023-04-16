import { Router } from "express";
import {
  allRoles,
  deleteARole,
  createRole,
  setRoleByUserId,
} from "../controllers/Role.controller";
import { AuthAndRoleChecker } from "../middleware/auth/authanticated.middleware";
import { ValidateJoi } from "../middleware/validation";
import { RoleSchema } from "../middleware/validation/role.schema.middleware";
import { protectRoute } from "../services/protectRoutes.service";
import { getAccessKeys } from "../utils/roleConstants";

let ADMIN_ACCESSKEY = "";
getAccessKeys((Keys: Record<string, string>) => {
  ADMIN_ACCESSKEY = Keys.ADMIN_ACCESSKEY;
});

const setRoleRouter = Router();

setRoleRouter.get(
  "/",
  [protectRoute],
  AuthAndRoleChecker(() => {
    return { value: ADMIN_ACCESSKEY };
  }),
  allRoles,
);

setRoleRouter.post(
  "/",
  [protectRoute],
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  createRole,
);

setRoleRouter.patch(
  "/update/:id",
  ValidateJoi(RoleSchema.roleTobeSet),
  [protectRoute],
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  setRoleByUserId,
);

setRoleRouter.delete(
  "/:id",
  [protectRoute],
  AuthAndRoleChecker(() => ({ value: ADMIN_ACCESSKEY })),
  deleteARole,
);
export default setRoleRouter;
