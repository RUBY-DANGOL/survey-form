import { useEffect, useMemo, useState } from "react";
import Button from "./Button.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import DynamicQuestionRenderer from "./DynamicQuestionRenderer.jsx";
import { shouldShowQuestion } from "../utils/shouldShowQuestion.js";

const PublicSurveyForm = ({ survey, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const visibleQuestions = useMemo(() => {
    return survey.questions.filter((question) => shouldShowQuestion(question, answers));
  }, [survey.questions, answers]);

  useEffect(() => {
    setAnswers((prev) => {
      const next = { ...prev };
      const visibleIds = new Set(visibleQuestions.map((question) => question.id));
      Object.keys(next).forEach((key) => {
        if (!visibleIds.has(key)) {
          delete next[key];
        }
      });
      return next;
    });
  }, [visibleQuestions]);

  const updateAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const missingRequired = visibleQuestions.filter((question) => {
      if (!question.required) return false;
      const value = answers[question.id];
      if (value === undefined || value === "") return true;
      if (Array.isArray(value) && value.length === 0) return true;
      return false;
    });

    if (missingRequired.length > 0) {
      setError("Please answer all required questions before submitting.");
      return;
    }

    const payload = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value
    }));

    onSubmit(payload);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <ErrorMessage message={error} />
      {visibleQuestions.map((question) => (
        <div key={question.id} className="section-card space-y-3 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base text-deep">{question.label}</h3>
            {question.required && <span className="badge">Required</span>}
          </div>
          <DynamicQuestionRenderer
            question={question}
            value={answers[question.id]}
            onChange={(value) => updateAnswer(question.id, value)}
          />
        </div>
      ))}
      <Button type="submit">Submit Survey</Button>
    </form>
  );
};

export default PublicSurveyForm;
