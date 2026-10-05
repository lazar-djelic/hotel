import api from "../lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post(
    "http://localhost:5001/api/users/login",
    data,
    { withCredentials: true },
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(
    "http://localhost:5001/api/users/logout",
    {},
    { withCredentials: true },
  );

  return response.data;
};

export interface RegisterPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post(
    "http://localhost:5001/api/users/register",
    data,
    { withCredentials: true },
  );

  return response.data;
};
