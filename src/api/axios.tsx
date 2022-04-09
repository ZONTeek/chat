import axios from "axios";
import { User } from "../types/types";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
});

export const API_login = async ({
  username,
  password,
}: any): Promise<User | string> => {
  try {
    const response = await axiosClient.post("/login", { username, password });

    return response.data;
  } catch (e) {
    return "Incorrect login or password";
  }
};

export const API_register = async ({
  username,
  password,
}: any): Promise<string> => {
  try {
    const response = await axiosClient.post("/register", {
      username,
      password,
    });
    return response.data.message;
  } catch (err) {
    console.log(err);
    return "Register failed";
  }
};

export const API_checkAuth = async (): Promise<any | boolean> => {
  try {
    const response = await axiosClient.get("/me");
    console.log(response);

    return response.data;
  } catch (err) {
    console.log("Unauthorized");
    return false;
  }
};

export const API_logout = async () => {
  try {
    const response = await axiosClient.delete("/logout");
    console.log(response);

    return response.status;
  } catch (err) {
    console.log("You are not logged");
  }
};
