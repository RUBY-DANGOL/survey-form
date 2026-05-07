export const createEmptySurvey = () => ({
  title: "",
  description: "",
  questions: []
});

export const defaultQuestion = () => ({
  id: "",
  type: "text",
  label: "",
  required: false,
  options: [],
  condition: null
});
