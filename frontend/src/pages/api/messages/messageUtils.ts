import { type RefObject } from "react";
import type { Conversation } from "./useConversationsList";
import type { IMessage } from "./useMyMessages";

export const hasUnseenMessages = (
  conversation: Conversation,
  user: any,
  markedAsSeenGuestsRef: RefObject<Set<string>>,
): boolean => {
  if (markedAsSeenGuestsRef.current.has(conversation.participantId)) {
    return false;
  }

  return conversation.messages.some((msg: IMessage) => {
    const senderId =
      typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
    return !msg.seen && senderId !== user?._id;
  });
};

export const getActiveConversationMessages = (
  activeConversationMessages: IMessage[],
  localMessages: IMessage[],
): IMessage[] => {
  const messagesMap = new Map<string, IMessage>();

  ((activeConversationMessages as IMessage[]) || []).forEach((msg) => {
    messagesMap.set(msg._id, msg);
  });

  ((localMessages as IMessage[]) || []).forEach((msg) => {
    messagesMap.set(msg._id, msg);
  });

  return Array.from(messagesMap.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};
