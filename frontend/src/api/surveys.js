import apiClient from "./client";

export const fetchSurveys = async () => {
  const { data } = await apiClient.get("/surveys");
  return data;
};

export const fetchSurveyById = async (id) => {
  const { data } = await apiClient.get(`/surveys/${id}`);
  return data;
};

export const createSurvey = async (payload) => {
  const { data } = await apiClient.post("/surveys", payload);
  return data;
};

export const updateSurvey = async (id, payload) => {
  const { data } = await apiClient.put(`/surveys/${id}`, payload);
  return data;
};

export const deleteSurvey = async (id) => {
  const { data } = await apiClient.delete(`/surveys/${id}`);
  return data;
};

export const fetchSurveyAnalytics = async (id) => {
  const { data } = await apiClient.get(`/surveys/${id}/analytics`);
  return data;
};
