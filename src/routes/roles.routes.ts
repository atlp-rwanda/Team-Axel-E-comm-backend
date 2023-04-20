import { Router } from "express";
import {
  assignRole,
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers";
import { RoleSchema, ValidateJoi } from "../middleware/validation";
import { protectRoute } from "../middleware/auth";

const rolesRouter = Router();

rolesRouter.get("/", [protectRoute], getAllRoles);
rolesRouter.post(
  "/",
  [protectRoute, ValidateJoi(RoleSchema.role.create)],
  createRole,
);
rolesRouter.patch(
  "/:id",
  [protectRoute, ValidateJoi(RoleSchema.role.update)],
  updateRole,
);
rolesRouter.delete("/:id", [protectRoute], deleteRole);
rolesRouter.patch(
  "/assign/:userId",
  [protectRoute],
  [ValidateJoi(RoleSchema.role.assign)],
  assignRole,
);

export default rolesRouter;
