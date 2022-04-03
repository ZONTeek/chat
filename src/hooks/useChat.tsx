import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useBeforeUnload } from "./useBeforeUnload";

export const useChat = (roomId: number) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const username = "Bob";
  const userId = 2;

  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io("http://f0655448.xsph.ru:5000", {
      query: { roomId },
    });
    socketRef.current.emit("user:add", { username, userId });

    socketRef.current.on("users", (users: any) => {
      setUsers(users);
    });
    socketRef.current.emit("messages:get");

    socketRef.current.on("messages", (messages: any) => {
      setMessages(messages);
    });

    console.log(users);
    console.log(messages);
    console.log(roomId);
    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect();
    };
    //eslint-disable-next-line
  }, [roomId]);

  const sendMessage = ({ messageText, senderName }: any) => {
    socketRef.current.emit("message:add", {
      userId,
      messageText,
      senderName,
    });
  };

  const removeMessage = (id: any) => {
    socketRef.current.emit("message:remove", id);
  };

  useBeforeUnload(() => {
    socketRef.current.emit("user:leave", userId);
  });

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
  return { users, messages, sendMessage, removeMessage };
};
