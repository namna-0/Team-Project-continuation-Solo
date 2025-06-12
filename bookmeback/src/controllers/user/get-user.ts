import { RequestHandler } from "express";
import { User } from "../../models";

export const getUser: RequestHandler = async (req, res) => {
  const user = await User.find({});

  res.status(200).json({
    user,
  });
  return;
};
