import { type Request, type Response, type NextFunction } from "express";
import User from "../../models/User.ts";
import { USER_ROLE } from "../../utils/enums.ts";
import { Message } from "../../models/Message.ts";

export async function getAllMyMessages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.session.userId;
    const user = await User.findById(id).populate("guest");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    let query: any = {};

    if (user.role === USER_ROLE.guest) {
      query = {
        $or: [
          { sender: id },
          { receiver: id, assignedReceptionist: { $ne: null } },
        ],
      };
    } else if (user.role === USER_ROLE.receptionist) {
      query = {
        $or: [
          {
            receiver: id,
            $or: [{ assignedReceptionist: null }, { assignedReceptionist: id }],
          },
          { assignedReceptionist: id },
          { receiver: null, assignedReceptionist: null },
        ],
      };
    }

    const messages = await Message.find(query)
      .populate([
        {
          path: "sender",
          populate: {
            path: "guest",
          },
        },
        {
          path: "receiver",
          populate: {
            path: "guest",
          },
        },
        {
          path: "assignedReceptionist",
        },
      ])
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getAllMyMessages controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
