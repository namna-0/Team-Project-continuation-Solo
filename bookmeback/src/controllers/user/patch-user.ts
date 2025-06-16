import { RequestHandler } from "express";
import { User } from "../../models";

export const patchUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      res.status(400).json({ message: "User Id is required" });
    }

    updateData.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Patch user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
