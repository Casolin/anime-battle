import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post("/api/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/api/login", credentials);
  return response.data;
};
