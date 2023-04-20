import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User.model";
import { verifyToken } from "../../utils";
import { getAllRolesService } from "../../services";
import { RoleAttribute } from "../../database/models/Role.model";

const protectedRoutes = new Map<string, string>();

/**
 * @name getAllRolesIds
 * @description This function gets all the roles and their routes
 * and stores them in a map.
 * This map is used to check if a user has access to a particular route.
 * Those routes are split into two parts, the first part is the route
 * itself and the second part is the id of the resource.
 * and we don't want to include the id in the map
 * because the id is dynamic and will be different for each resource.
 * @returns {void}
 */
(async function getAllRolesIds() {
  const roles = await getAllRolesService();
  roles.forEach((role: RoleAttribute) => {
    role.routes.forEach((route) => {
      protectedRoutes.set(route.split("/:")[0], role.id);
    });
  });
})();

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  ) {
    return res.status(401).json({
      error: "Unauthorized",
      status: 401,
      success: false,
    });
  }

  try {
    const splicedParam = req.originalUrl.split(`/${req.params.id}`)[0];
    const splicedQueryParam = req.originalUrl.split("?")[0];

    token = req.headers.authorization.split(" ")[1];
    const decodedData = await verifyToken(token);
    const user = await User.findByPk(decodedData.payload.toString());

    if (!user) throw new Error("User not found");

    req.user = user.dataValues;

    const origins = [
      "/api/v1/auth/2fa",
      "/api/v1/auth/2fa/disable",
      "/api/v1/auth/2fa/verify2FAToken",
    ];

    if (origins.includes(req.originalUrl)) {
      return next();
    }

    if (user.twoFAenabled) {
      if (user.twoFAverified) return next();

      return res.status(400).json({
        verified: false,
        status: 400,
        message: "Please verify your code sent to your email",
      });
    }

    if (protectedRoutes.get("*") === user.role) {
      next();
    } else {
      if (protectedRoutes.get(splicedParam) == user.role) {
        return next();
      } else if (protectedRoutes.get(splicedQueryParam) == user.role) {
        return next();
      } else {
        return res.status(403).json({
          status: 403,
          success: false,
          message: "Unauthorized.",
        });
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Error when verifying token",
        error: err.message,
      });
    }
  }
};
