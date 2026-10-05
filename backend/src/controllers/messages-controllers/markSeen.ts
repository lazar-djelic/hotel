import { type Request, type Response, type NextFunction } from "express";
import User from "../../models/User.ts";
import { USER_ROLE } from "../../utils/enums.ts";
import { Message } from "../../models/Message.ts";

export async function markSeen(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.session.userId;
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ message: "participantId is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    let updateQuery: any = {};

    if (user.role === USER_ROLE.guest) {
      updateQuery = {
        sender: participantId,
        $or: [{ receiver: id }, { assignedReceptionist: participantId }],
        seen: false,
      };
    } else if (user.role === USER_ROLE.receptionist) {
      updateQuery = {
        sender: participantId,
        $or: [
          { receiver: id },
          { assignedReceptionist: id },
          { receiver: null, assignedReceptionist: null },
        ],
        seen: false,
      };
    }

    const result = await Message.updateMany(updateQuery, { seen: true });

    res.status(200).json({
      message: "Messages marked as seen",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error marking messages as seen", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
