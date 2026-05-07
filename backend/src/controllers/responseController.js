import Survey from "../models/Survey.js";
import Response from "../models/Response.js";

const shouldShowQuestion = (question, answerMap) => {
  if (!question?.condition?.questionId) {
    return true;
  }
  const referenceValue = answerMap.get(question.condition.questionId);
  if (Array.isArray(referenceValue)) {
    return referenceValue.includes(question.condition.value);
  }
  return referenceValue === question.condition.value;
};

const validateAnswers = (survey, answers) => {
  if (!Array.isArray(answers)) {
    return "Answers must be an array.";
  }

  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.value]));
  const visibleQuestions = survey.questions.filter((question) =>
    shouldShowQuestion(question, answerMap)
  );

  for (const question of visibleQuestions) {
    const value = answerMap.get(question.id);
    if (question.required && (value === undefined || value === "")) {
      return `Missing required answer for: ${question.label}`;
    }
    if (value === undefined) continue;

    if (question.type === "text" && typeof value !== "string") {
      return `Invalid text answer for: ${question.label}`;
    }
    if (question.type === "rating") {
      if (typeof value !== "number" || value < 1 || value > 5) {
        return `Rating must be between 1 and 5 for: ${question.label}`;
      }
    }
    if (question.type === "single") {
      if (typeof value !== "string" || !question.options.includes(value)) {
        return `Invalid option for: ${question.label}`;
      }
    }
    if (question.type === "multi") {
      if (!Array.isArray(value)) {
        return `Invalid checkbox answer for: ${question.label}`;
      }
      const invalid = value.some((item) => !question.options.includes(item));
      if (invalid) {
        return `Invalid checkbox option for: ${question.label}`;
      }
    }
  }

  return null;
};

export const submitResponse = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found." });
    }

    const { answers } = req.body;
    const validationError = validateAnswers(survey, answers);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const response = await Response.create({
      surveyId: survey._id,
      answers
    });

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getResponses = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found." });
    }
    const responses = await Response.find({ surveyId: survey._id }).sort({ submittedAt: -1 });
    res.json(responses);
  } catch (error) {
    next(error);
  }
};
