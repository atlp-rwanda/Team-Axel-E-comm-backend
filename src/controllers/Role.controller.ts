import { Request, Response } from "express";
import User from "../database/models/User.model";
import { RoleAndPermissionAttribute } from "../interfaces/Roles.interface";
import {
  deleteRoleService,
  getAllRolesService,
  setRoleService,
} from "../services/Role.service";
import { isValidUuid } from "../utils";

// Get roles
export const allRoles = async (req: Request, res: Response) => {
  try {
    const allRolesAndPermissionsInDB = await getAllRolesService();
    res.status(200).json({
      status: 200,
      success: true,
      data: allRolesAndPermissionsInDB,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error occur while getting all roles",
        error: error.message,
      });
    }
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const role: RoleAndPermissionAttribute = req.body;

    const settedRole = await setRoleService(role);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Role setting is done successfully!",
      data: settedRole,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Validation error") {
        return res.status(500).json({
          status: 500,
          success: false,
          message: "The role already exist",
          error: error.message,
        });
      }
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error occur while seting role in db",
        error: error.message,
      });
    }
  }
};

export const setRoleByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (isValidUuid(req.body.role)) {
      const updatedUserRole = await User.update(
        { role: req.body.role },
        {
          where: { id: userId },
          returning: true,
        },
      );

      return res.status(200).json({
        status: 200,
        success: true,
        data: updatedUserRole,
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide a valid uuid",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error occur while giving role a specified user",
        error: error.message,
      });
    }
  }
};

export const deleteARole = async (req: Request, res: Response) => {
  try {
    if (!isValidUuid(req.params.id)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide a valid uuid for Role to delete",
      });
    }
    const deletationRes = await deleteRoleService(req.params.id);

    if (deletationRes === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Role doesn't exist!",
      });
    }
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Role deleted successfully",
      data: deletationRes,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error occur while deleting role",
        error: error.message,
      });
    }
  }
};
