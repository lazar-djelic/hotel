import React from "react";
import type { IMessage } from "./useMyMessages";

export interface Conversation {
  participantId: string;
  participantName: string;
  messages: IMessage[];
}

export const useConversationsList = (
  messages: IMessage[],
  localMessages: IMessage[],
  user: any,
  takenOverGuestIds: Set<string>,
): Conversation[] => {
  return React.useMemo(() => {
    const allMessagesForConversations = [
      ...((messages as IMessage[]) || []),
      ...localMessages,
    ];

    if (allMessagesForConversations.length === 0) return [];

    const conversationMap = new Map<string, IMessage[]>();

    allMessagesForConversations.forEach((msg: IMessage) => {
      const senderId =
        typeof msg.sender === "string" ? msg.sender : msg.sender?._id;

      if (takenOverGuestIds.has(senderId)) {
        return;
      }

      const receiverId =
        typeof msg.receiver === "string" ? msg.receiver : msg.receiver?._id;

      const isUserSender = senderId === user?._id;

      const otherPersonId = isUserSender ? receiverId : senderId;

      if (!conversationMap.has(otherPersonId)) {
        conversationMap.set(otherPersonId, []);
      }
      conversationMap.get(otherPersonId)?.push(msg);
    });

    return Array.from(conversationMap.entries())
      .map(([participantId, msgs]) => {
        const firstMessage = msgs[0];
        let otherPerson =
          typeof firstMessage.sender === "string"
            ? null
            : firstMessage.sender?._id === user?._id
              ? firstMessage.receiver
              : firstMessage.sender;

        let participantName = "";
        if (otherPerson?.guest) {
          participantName = `${otherPerson.guest.fName} ${otherPerson.guest.lName}`;
        } else if (otherPerson?.name) {
          participantName = otherPerson.name;
        } else if (participantId) {
          participantName = participantId.substring(0, 8) || "Unknown";
        } else {
          participantName = "Unknown";
        }

        return {
          participantId: participantId || "unknown",
          participantName,
          messages: msgs,
        };
      })
      .sort((a, b) => {
        const aLast = a.messages[a.messages.length - 1]?.createdAt;
        const bLast = b.messages[b.messages.length - 1]?.createdAt;
        return new Date(bLast).getTime() - new Date(aLast).getTime();
      });
  }, [messages, localMessages, user?._id, takenOverGuestIds]);
};
