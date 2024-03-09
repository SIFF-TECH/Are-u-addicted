import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_TOKEN, async (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyTokenAuthorisation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.ID_user.toString() === req.params.id || req.user?.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not allowed to take this action!"));
    }
  });
};

export const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not allowed to take this action!"));
    }
  });
};
