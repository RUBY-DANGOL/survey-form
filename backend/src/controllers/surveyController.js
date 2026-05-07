import Survey from "../models/Survey.js";
import Response from "../models/Response.js";

export const createSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).json(survey);
  } catch (error) {
    next(error);
  }
};

export const getSurveys = async (req, res, next) => {
  try {
    const surveys = await Survey.find({}).sort({ createdAt: -1 });
    res.json(surveys);
  } catch (error) {
    next(error);
  }
};

export const getSurveyById = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found." });
    }
    res.json(survey);
  } catch (error) {
    next(error);
  }
};

export const updateSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!survey) {
      return res.status(404).json({ message: "Survey not found." });
    }
    res.json(survey);
  } catch (error) {
    next(error);
  }
};

export const deleteSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found." });
    }
    await Response.deleteMany({ surveyId: survey._id });
    res.json({ message: "Survey deleted." });
  } catch (error) {
    next(error);
  }
};

const buildAnalytics = (survey, responses) => {
  const totalResponses = responses.length;

  const questions = survey.questions.map((question) => {
    const answers = responses
      .map((response) => response.answers.find((answer) => answer.questionId === question.id))
      .filter(Boolean)
      .map((answer) => answer.value);

    if (question.type === "text") {
      return {
        id: question.id,
        label: question.label,
        type: question.type,
        answers: answers.filter((value) => typeof value === "string" && value.trim() !== "")
      };
    }

    if (question.type === "rating") {
      const numericAnswers = answers.filter((value) => typeof value === "number");
      const average = numericAnswers.length
        ? (numericAnswers.reduce((sum, value) => sum + value, 0) / numericAnswers.length).toFixed(2)
        : "0.00";
      return {
        id: question.id,
        label: question.label,
        type: question.type,
        average
      };
    }

    if (question.type === "single" || question.type === "multi") {
      const optionCounts = question.options.map((option) => ({ option, count: 0 }));
      answers.forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((selected) => {
            const match = optionCounts.find((item) => item.option === selected);
            if (match) match.count += 1;
          });
        } else {
          const match = optionCounts.find((item) => item.option === value);
          if (match) match.count += 1;
        }
      });
      return {
        id: question.id,
        label: question.label,
        type: question.type,
        options: optionCounts
      };
    }

    return { id: question.id, label: question.label, type: question.type };
  });

  return { totalResponses, questions };
};

export const getSurveyAnalytics = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found." });
    }
    const responses = await Response.find({ surveyId: survey._id });
    const analytics = buildAnalytics(survey, responses);
    res.json(analytics);
  } catch (error) {
    next(error);
  }
};
