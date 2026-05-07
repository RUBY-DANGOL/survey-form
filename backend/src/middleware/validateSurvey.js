const allowedTypes = ["text", "single", "multi", "rating"];

const validateSurvey = (req, res, next) => {
  const { title, questions } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Survey title is required." });
  }

  if (!Array.isArray(questions)) {
    return res.status(400).json({ message: "Questions must be an array." });
  }

  for (const question of questions) {
    if (!question.id || !question.type || !question.label) {
      return res.status(400).json({ message: "Each question must include id, type, and label." });
    }
    if (!allowedTypes.includes(question.type)) {
      return res.status(400).json({ message: "Invalid question type." });
    }
    if ((question.type === "single" || question.type === "multi") && (!question.options || question.options.length === 0)) {
      return res.status(400).json({ message: "Options are required for choice questions." });
    }
  }

  return next();
};

export default validateSurvey;
