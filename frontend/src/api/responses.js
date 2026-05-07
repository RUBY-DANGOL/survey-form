import apiClient from "./client";

export const submitSurveyResponse = async (surveyId, payload) => {
  const { data } = await apiClient.post(`/surveys/${surveyId}/responses`, payload);
  return data;
};

export const fetchSurveyResponses = async (surveyId) => {
  const { data } = await apiClient.get(`/surveys/${surveyId}/responses`);
  return data;
};
