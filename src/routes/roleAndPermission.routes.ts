import { Router } from "express";
import {
  addPermissions,
  removePermissions,
  setRoleAndPermission,
  setRoleToUser,
} from "../controllers/RoleAndPermission.controller";
import { permisionCheck } from "../middleware/permissionCheck/permission.middleware";
import { ValidateJoi } from "../middleware/validation";
import { RoleAndPermissionsSchema } from "../middleware/validation/RoleAndPermission.schema.middleware";
import { protectRoute } from "../services/protectRoutes.service";

const SET_PERMISSION = process.env.SET_PERMISSION as string;
const RM_PERMISSION = process.env.RM_PERMISSION as string;
const ADD_PERMISSION = process.env.ADD_PERMISSION as string;
const SET_ROLE = process.env.SET_ROLE as string;

const setRoleAndPermissionRouter = Router();

setRoleAndPermissionRouter.patch(
  "/update/:id",
  ValidateJoi(RoleAndPermissionsSchema.roleTobeSet),
  [protectRoute, permisionCheck(SET_ROLE)],
  setRoleToUser,
);

setRoleAndPermissionRouter.patch(
  "/permissions/add/:role",
  ValidateJoi(RoleAndPermissionsSchema.permissionsToAdd),
  [protectRoute, permisionCheck(ADD_PERMISSION)],
  addPermissions,
);
//   ,
setRoleAndPermissionRouter.delete(
  "/permissions/remove/:role",
  ValidateJoi(RoleAndPermissionsSchema.permissionsToRemove),
  [protectRoute, permisionCheck(RM_PERMISSION)],
  removePermissions,
);

setRoleAndPermissionRouter.post(
  "/set",
  ValidateJoi(RoleAndPermissionsSchema.roleAndPermissions),
  [protectRoute, permisionCheck(SET_PERMISSION)],
  setRoleAndPermission,
);

export default setRoleAndPermissionRouter;
