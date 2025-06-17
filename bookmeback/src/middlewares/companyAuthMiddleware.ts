import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const unifiedAuthMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authType = req.headers["auth-type"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "JWT_SECRET тохиргоог оруулна уу" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (authType === "user") {
      const { userId } = decoded as { userId: string };
      if (!userId) {
        res.status(401).json({ message: "Invalid user token" });
        return;
      }
      (req as any).userId = userId;
    } else if (authType === "company") {
      const { companyId } = decoded as { companyId: string };
      if (!companyId) {
        res.status(401).json({ message: "Invalid company token" });
        return;
      }
      (req as any).companyId = companyId;
    } else {
      res
        .status(400)
        .json({ message: "Auth-Type header is missing or invalid" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
    return;
  }
};
