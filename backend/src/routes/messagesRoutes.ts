import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { Message } from "../models/Message.ts";
import User from "../models/User.ts";

const router = express.Router();

router.get(
  "/",
  authenAndAuthorize<Request>([USER_ROLE.receptionist, USER_ROLE.guest]),
  async (req: Request, res: Response, next: NextFunction) => {
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
              $or: [
                { assignedReceptionist: null },
                { assignedReceptionist: id },
              ],
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
  },
);

router.put(
  "/mark-seen",
  authenAndAuthorize<Request>([USER_ROLE.receptionist, USER_ROLE.guest]),
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

export default router;
