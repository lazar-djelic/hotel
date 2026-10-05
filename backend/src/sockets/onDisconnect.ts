import { Socket } from "socket.io";
import { onlineUsers } from "../utils/onlineUsers.ts";

export const onDisconnect = async (socket: Socket) => {
  console.log("User disconnected");

  for (const [userId, sockets] of onlineUsers.entries()) {
    sockets.delete(socket.id);

    if (sockets.size === 0) {
      onlineUsers.delete(userId);
    }
  }
};
