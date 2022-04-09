import { API_checkAuth, API_login, API_logout, API_register } from "api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginProps, User } from "types/types";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await API_checkAuth();

      if (response) {
        setUser(response.user as User);
        setAuthenticated(true);
        setUsers(response.users);
        navigate("/");
      }
    };
    checkAuth();
    //eslint-disable-next-line
  }, []);

  const login = async ({ username, password }: LoginProps) => {
    clearError();
    const response = await API_login({ username, password });
    if (typeof response === "string") {
      setError(response);
    } else {
      setAuthenticated(true);
      setUser(response);
      navigate("/");
    }
  };

  const logout = async () => {
    clearError();
    const responseStatus = await API_logout();
    if (responseStatus === 200) {
      setAuthenticated(false);
      setUser(undefined);
    }
  };

  const register = async ({ username, password }: LoginProps) => {
    clearError();
    const response = await API_register({ username, password });
    if (response === "Success") {
      navigate("/login");
    } else {
      setError(response);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    authenticated,
    users,
    user,
    error,
    login,
    logout,
    register,
    clearError,
  };
};
