import { useNavigate } from "react-router-dom";
import { User } from "types/types";

export const RoomList = ({ logout, users }: any): JSX.Element => {
  const navigate = useNavigate();
  const goToRoom = (id: number) => {
    navigate(id);
  };

  return (
    <div>
      {users.map((user: User) => (
        <div onClick={() => goToRoom(user.id)}>{user.username}</div>
      ))}

      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
