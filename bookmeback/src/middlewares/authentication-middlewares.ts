import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }
  try {
    const { userId, isAdmin } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
      isAdmin: boolean;
    };
    (req as any).userId = userId;
    (req as any).isAdmin = isAdmin;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token middleware" });
  }
};
