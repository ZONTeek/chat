export const isResponseError = (
  arg: LoginResponse | ResponseError
): arg is ResponseError => {
  return (arg as ResponseError).error !== undefined;
};

export type User = {
  id: number;
  username: string;
  online: boolean;
};

export type LoginProps = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  users: User[];
};

export type ResponseError = {
  error: string;
};

export type Message = {
  createdAt: string;
  messageId: string;
  messageText: string;
  recipientId: string;
  senderId: string;
  senderName: string;
};
