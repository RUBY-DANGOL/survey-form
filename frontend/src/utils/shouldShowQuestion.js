export const shouldShowQuestion = (question, answers) => {
  if (!question?.condition?.questionId) {
    return true;
  }

  const conditionValue = question.condition.value;
  const referenceValue = answers[question.condition.questionId];

  if (Array.isArray(referenceValue)) {
    return referenceValue.includes(conditionValue);
  }

  return referenceValue === conditionValue;
};
