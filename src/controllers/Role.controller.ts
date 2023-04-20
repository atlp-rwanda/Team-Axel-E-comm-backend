import { Request, Response } from "express";
import { asyncHandler } from "../utils";

import {
  assignRoleService,
  createRoleService,
  deleteRoleService,
  getAllRolesService,
  updateRoleService,
} from "../services";

export const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
  const allRoles = await getAllRolesService();
  res.status(200).json({ status: 200, success: true, data: allRoles });
});

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { role, routes } = req.body;
  const createdRole = await createRoleService({ role, routes });
  res.status(201).json({ status: 201, success: true, data: createdRole });
});

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const { role, routes } = req.body;
  const { id } = req.params;
  const updatedRole = await updateRoleService({ id, role, routes });
  res.status(200).json({ status: 200, success: true, data: updatedRole });
});

export const deleteRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedRole = await deleteRoleService(id);
  res.status(200).json({ status: 200, success: true, data: deletedRole });
});

export const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const { userId } = req.params;
  const assignedRole = await assignRoleService({ userId, id });
  res.status(200).json({ status: 200, success: true, data: assignedRole });
});
