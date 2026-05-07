import apiClient from "./client";

export const loginAdmin = async (payload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
};

export const fetchMe = async () => {
  const { data } = await apiClient.get("/auth/me");
  return data;
};
