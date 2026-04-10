import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../services/socket";
import { useAuth } from "../../context/AuthContext";
import { useMyMessages } from "../api/messages/useMyMessages";
import { useMarkMessagesSeen } from "../api/messages/useMarkMessagesSeen";

export interface IMessage {
  _id: string;
  sender: any;
  receiver?: any;
  content: string;
  seen: boolean;
  assignedReceptionist?: any;
  createdAt: Date;
}

interface Conversation {
  participantId: string;
  participantName: string;
  messages: IMessage[];
}

const MessagesPageReception: React.FC = () => {
  const { user } = useAuth();
  const { messages } = useMyMessages();
  const markAsSeenMutation = useMarkMessagesSeen();
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<IMessage[]>([]);
  const [takenOverGuestIds, setTakenOverGuestIds] = useState<Set<string>>(
    new Set(),
  );
  const markedGuestsRef = useRef<Set<string>>(new Set());
  const markedAsSeenGuestsRef = useRef<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = React.useMemo(() => {
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

  const activeConversation = conversations.find(
    (c) => c.participantId === activeChatId,
  );

  const allMessages = activeConversation
    ? (() => {
        const messagesMap = new Map<string, IMessage>();

        ((activeConversation.messages as IMessage[]) || []).forEach((msg) => {
          messagesMap.set(msg._id, msg);
        });

        ((localMessages as IMessage[]) || []).forEach((msg) => {
          messagesMap.set(msg._id, msg);
        });

        return Array.from(messagesMap.values()).sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      })()
    : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [allMessages, activeChatId]);

  const sendMessage = () => {
    if (!input.trim() || !activeConversation) return;

    socket.emit("send_message", {
      sender: user._id,
      receiver: activeConversation.participantId,
      content: input,
    });

    setInput("");
  };

  const hasUnseenMessages = (conversation: Conversation): boolean => {
    if (markedAsSeenGuestsRef.current.has(conversation.participantId)) {
      return false;
    }

    return conversation.messages.some((msg: IMessage) => {
      const senderId =
        typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
      return !msg.seen && senderId !== user?._id;
    });
  };

  const handleSelectChat = (participantId: string) => {
    setActiveChatId(participantId);
    markedGuestsRef.current.delete(participantId);
    markedAsSeenGuestsRef.current.add(participantId);
    markAsSeenMutation.mutate(participantId);
  };

  return (
    <div className="flex h-auto max-h-screen overflow-hidden">
      <div className="w-80 border-r flex flex-col overflow-hidden">
        <div className="p-4 font-bold text-lg">Chats</div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.participantId}
              onClick={() => {
                handleSelectChat(conversation.participantId);
              }}
              className={`p-4 cursor-pointer hover:bg-base-200 transition ${
                conversation.participantId === activeChatId ? "bg-base-200" : ""
              }`}
            >
              <div
                className={`${
                  hasUnseenMessages(conversation) ? "font-bold" : "font-medium"
                }`}
              >
                {conversation.participantName}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {
                  conversation.messages[conversation.messages.length - 1]
                    ?.content
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {activeConversation ? (
          <>
            <div className="p-4 border-b border-base-300 font-semibold text-3xl">
              {activeConversation.participantName}
            </div>

            <div className="max-h-[calc(100vh-220px)] overflow-hidden">
              <div
                ref={messagesEndRef}
                className="h-full overflow-y-auto p-4 space-y-4 scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {allMessages.map((msg) => {
                  const senderId =
                    typeof msg.sender === "string"
                      ? msg.sender
                      : msg.sender?._id;
                  const userId = typeof user === "string" ? user : user?._id;

                  const isOwn = senderId === userId;

                  return (
                    <div
                      key={msg._id}
                      className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
                    >
                      <div className="chat-bubble">{msg.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-base-300 flex gap-2 flex-shrink-0">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPageReception;
