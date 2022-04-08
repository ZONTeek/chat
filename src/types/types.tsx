export type User = {
  id: number;
  username: string;
  online: boolean;
};

export type LoginProps = {
    username: string;
    password: string;
}