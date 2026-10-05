import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../services/socket";
import { useAuth } from "../../context/AuthContext";
import { useMyMessages } from "../api/messages/useMyMessages";
import { useMarkMessagesSeen } from "../api/messages/useMarkMessagesSeen";
import { useTranslation } from "react-i18next";

export interface IMessage {
  _id: string;
  sender: any;
  receiver?: any;
  content: string;
  seen: boolean;
  assignedReceptionist?: any;
  createdAt: Date;
}

const MessagesPageGuest: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { messages } = useMyMessages();
  const markAsSeenMutation = useMarkMessagesSeen();
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const markedReceptionistsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleReceiveMessage = (message: IMessage) => {
      setLocalMessages((prev) => [...prev, message]);

      const senderId =
        typeof message.sender === "string"
          ? message.sender
          : message.sender?._id;
      if (senderId !== user?._id) {
        markAsSeenMutation.mutate(senderId);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [user?._id, markAsSeenMutation]);

  useEffect(() => {
    const hasUnseenMessages = (messages as any[])?.some((msg: any) => {
      const senderId =
        typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
      return !msg.seen && senderId !== user?._id;
    });

    if (hasUnseenMessages && (messages as any[])?.length > 0) {
      const firstReceptionistMessage = (messages as any[])?.find((msg: any) => {
        const senderId =
          typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
        return senderId !== user?._id;
      });

      if (firstReceptionistMessage?.sender) {
        const senderId =
          typeof firstReceptionistMessage.sender === "string"
            ? firstReceptionistMessage.sender
            : firstReceptionistMessage.sender?._id;

        if (senderId && !markedReceptionistsRef.current.has(senderId)) {
          markedReceptionistsRef.current.add(senderId);
          markAsSeenMutation.mutate(senderId, {
            onError: () => {
              markedReceptionistsRef.current.delete(senderId);
            },
          });
        }
      }
    }
  }, [messages, user?._id, markAsSeenMutation]);

  const allMessages = (() => {
    const messagesMap = new Map<string, IMessage>();

    ((messages as IMessage[]) || []).forEach((msg) => {
      messagesMap.set(msg._id, msg);
    });

    localMessages.forEach((msg) => {
      if (msg._id) {
        messagesMap.set(msg._id, msg);
      }
    });

    return Array.from(messagesMap.values()).sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  })();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [allMessages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      sender: user._id,
      receiver: "reception",
      content: input,
    });

    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col overflow-hidden">
      <div className="p-4 border-b border-base-300 font-semibold text-3xl flex-shrink-0">
        {t("messages.reception")}
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
              typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
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
    </div>
  );
};

export default MessagesPageGuest;
