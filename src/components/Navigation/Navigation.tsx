import { ChatRoom } from "components/ChatRoom/ChatRoom";
import { Login } from "components/Login/Login";
import { RoomList } from "components/RoomList/RoomList";
import { useAuth } from "hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ children, authenticated }: ProtectedRouteProps) => {
  if (authenticated) return <>{children}</>;
  return <Navigate to={"/login"} />;
};

export const Navigation = (): JSX.Element => {
  const { authenticated, error, login, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login login={login} error={error} />} />
      <Route
        path="/:roomId"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <ChatRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <RoomList logout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          authenticated ? <Navigate to={"/"} /> : <Navigate to={"login"} />
        }
      />
    </Routes>
  );
};

type ProtectedRouteProps = {
  children: JSX.Element;
  authenticated: boolean;
};
