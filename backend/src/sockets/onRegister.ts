import User from "../models/User.ts";
import { onlineUsers } from "../utils/onlineUsers.ts";
import { Socket } from "socket.io";

export const onRegister = async (socket: Socket, userId: string) => {
  const user = await User.findById(userId);
  if (!user) return;

  socket.data.user = user;

  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }

  onlineUsers.get(userId)!.add(socket.id);

  console.log(onlineUsers);
};
