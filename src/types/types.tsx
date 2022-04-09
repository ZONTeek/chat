export type User = {
  id: number;
  username: string;
  online: boolean;
};

export type LoginProps = {
  username: string;
  password: string;
};

export type Message = {
  createdAt: string;
  messageId: string;
  messageText: string;
  recipientId: string;
  senderId: string;
  senderName: string;
};
