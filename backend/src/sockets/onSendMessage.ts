import { Message } from "../models/Message.ts";
import { Server, Socket } from "socket.io";
import { USER_ROLE } from "../utils/enums.ts";
import { onlineUsers } from "../utils/onlineUsers.ts";
import User from "../models/User.ts";

const populateMessage = (messageId: any) =>
  Message.findById(messageId).populate([
    { path: "sender", populate: { path: "guest" } },
    { path: "receiver", populate: { path: "guest" } },
    { path: "assignedReceptionist" },
  ]);

export const onSendMessage = async (io: Server, socket: Socket, data: any) => {
  try {
    const user = socket.data.user;
    if (!user) return;

    let { receiver, content } = data;
    if (!receiver || !content?.trim()) return;

    if (![USER_ROLE.guest, USER_ROLE.receptionist].includes(user.role)) return;

    if (receiver === "reception" && user.role === USER_ROLE.guest) {
      const existingAssignment = await Message.findOne({
        sender: user._id,
        assignedReceptionist: { $exists: true, $ne: null },
      });

      if (existingAssignment && existingAssignment.assignedReceptionist) {
        receiver = existingAssignment.assignedReceptionist.toString();

        const receiverUser = await User.findById(receiver);
        if (!receiverUser) return;

        const messageData: any = {
          sender: user._id,
          receiver,
          content,
          assignedReceptionist: existingAssignment.assignedReceptionist,
        };

        const rawMessage = await Message.create(messageData);
        const message = await populateMessage(rawMessage._id);

        const receiverSockets = onlineUsers.get(receiver.toString());

        if (receiverSockets) {
          receiverSockets.forEach((id) => {
            io.to(id).emit("receive_message", message);
          });
        }

        io.to(socket.id).emit("receive_message", message);
        return;
      } else {
        const rawMessage = await Message.create({
          sender: user._id,
          receiver: null,
          content,
          assignedReceptionist: null,
        });
        const message = await populateMessage(rawMessage._id);

        const receptionists = await User.find({
          role: USER_ROLE.receptionist,
        });

        for (const receptionist of receptionists) {
          const receptionistSockets = onlineUsers.get(
            receptionist._id.toString(),
          );
          if (receptionistSockets) {
            receptionistSockets.forEach((id) => {
              io.to(id).emit("receive_message", message);
            });
          }
        }

        io.to(socket.id).emit("receive_message", message);
        return;
      }
    }

    if (receiver === user._id.toString()) return;

    const receiverUser = await User.findById(receiver);
    if (!receiverUser) return;

    const isValid =
      (user.role === USER_ROLE.guest &&
        receiverUser.role === USER_ROLE.receptionist) ||
      (user.role === USER_ROLE.receptionist &&
        receiverUser.role === USER_ROLE.guest);

    if (!isValid) return;

    const messageData: any = {
      sender: user._id,
      receiver,
      content,
    };

    if (
      user.role === USER_ROLE.receptionist &&
      receiverUser.role === USER_ROLE.guest
    ) {
      const unassignedMessages = await Message.findOne({
        sender: receiverUser._id,
        receiver: null,
        assignedReceptionist: null,
      });

      if (unassignedMessages) {
        messageData.assignedReceptionist = user._id;

        await Message.updateMany(
          {
            sender: receiverUser._id,
            receiver: null,
            assignedReceptionist: null,
          },
          {
            $set: { assignedReceptionist: user._id },
          },
        );

        const receptionists = await User.find({
          role: USER_ROLE.receptionist,
          _id: { $ne: user._id },
        });

        for (const receptionist of receptionists) {
          const receptionistSockets = onlineUsers.get(
            receptionist._id.toString(),
          );
          if (receptionistSockets) {
            receptionistSockets.forEach((id) => {
              io.to(id).emit("conversation_taken_over", {
                guestId: receiverUser._id.toString(),
                receptionistId: user._id.toString(),
                receptionistName: user.name,
              });
            });
          }
        }
      } else {
        const existingAssignment = await Message.findOne({
          sender: receiverUser._id,
          assignedReceptionist: user._id,
        });

        if (existingAssignment) {
          messageData.assignedReceptionist = user._id;
        }
      }
    }

    const rawMessage = await Message.create(messageData);
    const message = await populateMessage(rawMessage._id);

    const receiverSockets = onlineUsers.get(receiver.toString());

    if (receiverSockets) {
      receiverSockets.forEach((id) => {
        io.to(id).emit("receive_message", message);
      });
    }

    io.to(socket.id).emit("receive_message", message);
  } catch (err) {
    console.error("Send message error:", err);
  }
};
