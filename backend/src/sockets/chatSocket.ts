import { Server, Socket } from "socket.io";
import { onRegister } from "./onRegister.ts";
import { onSendMessage } from "./onSendMessage.ts";
import { onDisconnect } from "./onDisconnect.ts";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("register", (userId: string) => {
    onRegister(socket, userId);
  });

  socket.on("send_message", async (data) => {
    onSendMessage(io, socket, data);
  });

  socket.on("disconnect", () => {
    onDisconnect(socket);
  });
};
