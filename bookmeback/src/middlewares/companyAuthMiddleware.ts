import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const companyAuthMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: "JWT_SECRET тохиргоог оруулна уу" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown;

    const payload = decoded as { companyId: string };

    if (!payload.companyId) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    (req as any).companyId = payload.companyId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
