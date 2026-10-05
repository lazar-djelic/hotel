import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { IMessage } from "./useMyMessages";
import { QUERY_KEYS } from "../../../config/query-keys";
import { socket } from "../../../services/socket";
import type { UserStruct } from "../structs/UserStruct";

export const useUnseenMessages = (
  shouldFetchMessages: boolean,
  user: UserStruct | null,
  messages: IMessage[],
) => {
  const queryClient = useQueryClient();
  const pendingUnseenRef = useRef<Set<string>>(new Set());
  const [pendingUpdate, setPendingUpdate] = useState(false);

  useEffect(() => {
    if (!shouldFetchMessages) return;

    const handleReceiveMessage = async (message: any) => {
      const senderId =
        typeof message.sender === "string"
          ? message.sender
          : message.sender?._id;

      if (senderId !== user?._id) {
        pendingUnseenRef.current.add(senderId);
        setPendingUpdate(true);
      }

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
        exact: true,
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
        exact: true,
      });

      setTimeout(() => {
        pendingUnseenRef.current.clear();
        setPendingUpdate(false);
      }, 100);
    };

    const handleConversationTakenOver = async () => {
      pendingUnseenRef.current.clear();
      setPendingUpdate(false);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
        exact: true,
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
        exact: true,
      });
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("conversation_taken_over", handleConversationTakenOver);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("conversation_taken_over", handleConversationTakenOver);
    };
  }, [queryClient, shouldFetchMessages, user?._id]);

  const unseenCount = user
    ? ((messages as any[])?.filter((msg: any) => {
        if (!msg.seen) {
          const senderId =
            typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
          if (user.role === "guest") {
            return senderId !== user?._id;
          } else if (user.role === "receptionist") {
            return senderId !== user?._id;
          }
        }
        return false;
      }).length || 0) + (pendingUpdate ? pendingUnseenRef.current.size : 0)
    : 0;

  return unseenCount;
};
