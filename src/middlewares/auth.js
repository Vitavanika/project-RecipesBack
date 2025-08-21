import jwt from "jsonwebtoken";
import createError from "http-errors";
import { User } from "../models/user";

export const auth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) throw createError(401, "Missing or invalid token");

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub || payload.id).select("_id role status");
    if (!user) throw createError(401, "User not found");

    req.user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    next(createError(err.status || 401, err.message || "Unauthorized"));
  }
};