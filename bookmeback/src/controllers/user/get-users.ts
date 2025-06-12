import { RequestHandler } from "express";
import { User } from "../../models";

export const getUsers: RequestHandler = async (req, res) => {
  const { userId } = req.query;
  const user = await User.find(userId ? { userId: userId } : {}).populate(
    "user"
  );

  res.status(200).json({ user });
};
