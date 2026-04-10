import { useEffect, type RefObject } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { IMessage } from "./useMyMessages";
import { socket } from "../../../services/socket";

interface SocketHandlerParams {
  activeChatId: string;
  user: any;
  markedGuestsRef: RefObject<Set<string>>;
  markedAsSeenGuestsRef: RefObject<Set<string>>;
  markAsSeenMutation: UseMutationResult<any, any, any, any>;
  setLocalMessages: (cb: (prev: IMessage[]) => IMessage[]) => void;
  setTakenOverGuestIds: (cb: (prev: Set<string>) => Set<string>) => void;
  setActiveChatId: (cb: (prev: string) => string) => void;
}

export const useMessageSocketHandlers = ({
  activeChatId,
  user,
  markedGuestsRef,
  markedAsSeenGuestsRef,
  markAsSeenMutation,
  setLocalMessages,
  setTakenOverGuestIds,
  setActiveChatId,
}: SocketHandlerParams) => {
  useEffect(() => {
    const handleReceiveMessage = (message: IMessage) => {
      setLocalMessages((prev) => [...prev, message]);

      const senderId =
        typeof message.sender === "string"
          ? message.sender
          : message.sender?._id;

      if (senderId !== user?._id) {
        if (activeChatId && senderId === activeChatId && !message.seen) {
          if (!markedGuestsRef.current.has(activeChatId)) {
            markedGuestsRef.current.add(activeChatId);
            markAsSeenMutation.mutate(activeChatId);
          }
        } else if (senderId !== activeChatId) {
          markedAsSeenGuestsRef.current.delete(senderId);
        }
      }
    };

    const handleConversationTakenOver = (data: {
      guestId: string;
      receptionistId: string;
      receptionistName: string;
    }) => {
      setTakenOverGuestIds((prev) => new Set(prev).add(data.guestId));
      markedGuestsRef.current.delete(data.guestId);
      markedAsSeenGuestsRef.current.delete(data.guestId);

      setLocalMessages((prev) =>
        prev.filter((msg) => {
          const senderId =
            typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
          return senderId !== data.guestId;
        }),
      );

      setActiveChatId((prev) => {
        if (prev === data.guestId) {
          return "";
        }
        return prev;
      });
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("conversation_taken_over", handleConversationTakenOver);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("conversation_taken_over", handleConversationTakenOver);
    };
  }, [activeChatId, user?._id, markAsSeenMutation]);
};
