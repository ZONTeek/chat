import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Message, User } from "types/types";
import { useBeforeUnload } from "./useBeforeUnload";

export const useChat = (roomId: string) => {
  const [users, setUsers] = useState<User>();
  const [messages, setMessages] = useState<Message[]>();

  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_URL as string, {
      query: { roomId },
      withCredentials: true,
    });

    socketRef.current.emit("user:start");

    socketRef.current.on("users", (users: any) => {
      setUsers(users);
    });
    socketRef.current.emit("messages:get");

    socketRef.current.on("messages", (messages: any) => {
      setMessages(messages);
    });

    return () => {
      socketRef.current.disconnect();
    };

    //eslint-disable-next-line
  }, [roomId]);

  const sendMessage = (messageText: string) => {
    socketRef.current.emit("messages:add", {
      messageText,
    });
  };

  const removeMessage = (id: any) => {
    socketRef.current.emit("messages:remove", id);
  };

  useBeforeUnload(() => {
    socketRef.current.emit("user:leave", roomId);
  });

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
  return { users, messages, sendMessage, removeMessage };
};
