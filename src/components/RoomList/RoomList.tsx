import { useChat } from "hooks/useChat";
import { useEffect } from "react";

export const RoomList = ({ logout }: any): JSX.Element => {
  const { messages } = useChat(1);
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  useEffect(() => {
    //sendMessage({ messageText: "Privet", senderName: "Alice" });
  }, []);
  return (
    <div>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
