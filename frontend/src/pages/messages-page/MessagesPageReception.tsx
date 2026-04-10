import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../services/socket";
import { useAuth } from "../../context/AuthContext";
import { useMyMessages } from "../api/messages/useMyMessages";
import { useMarkMessagesSeen } from "../api/messages/useMarkMessagesSeen";
import { useConversationsList } from "../api/messages/useConversationsList";
import { useMessageSocketHandlers } from "../api/messages/useMessageSocketHandlers";
import {
  hasUnseenMessages,
  getActiveConversationMessages,
} from "../api/messages/messageUtils";
import type { IMessage } from "../api/messages/useMyMessages";
import { useTranslation } from "react-i18next";

const MessagesPageReception: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
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

  const conversations = useConversationsList(
    messages,
    localMessages,
    user,
    takenOverGuestIds,
  );

  useMessageSocketHandlers({
    activeChatId,
    user,
    markedGuestsRef,
    markedAsSeenGuestsRef,
    markAsSeenMutation,
    setLocalMessages,
    setTakenOverGuestIds,
    setActiveChatId,
  });

  const activeConversation = conversations.find(
    (c) => c.participantId === activeChatId,
  );

  const allMessages = activeConversation
    ? getActiveConversationMessages(activeConversation.messages, localMessages)
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

  const handleSelectChat = (participantId: string) => {
    setActiveChatId(participantId);
    markedGuestsRef.current.delete(participantId);
    markedAsSeenGuestsRef.current.add(participantId);
    markAsSeenMutation.mutate(participantId);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      <div className="w-80 border-r flex flex-col overflow-hidden flex-shrink-0">
        <div className="p-4 font-bold text-lg flex-shrink-0">
          {t("messages.chats")}
        </div>

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
                  hasUnseenMessages(conversation, user, markedAsSeenGuestsRef)
                    ? "font-bold"
                    : "font-medium"
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
            <div className="p-4 border-b border-base-300 font-semibold text-3xl flex-shrink-0">
              {activeConversation.participantName}
            </div>

            <div className="flex-1 overflow-hidden min-h-0">
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
                placeholder={t("messages.type")}
                className="input input-bordered flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                {t("messages.send")}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            {t("messages.selectchat")}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPageReception;
