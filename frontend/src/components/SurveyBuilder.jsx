import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import QuestionEditor from "./QuestionEditor.jsx";
import EmptyState from "./EmptyState.jsx";

const SurveyBuilder = ({ initialSurvey, onSubmit, isSaving }) => {
  const [survey, setSurvey] = useState(initialSurvey);

  useEffect(() => {
    setSurvey(initialSurvey);
  }, [initialSurvey]);

  const addQuestion = () => {
    const newQuestion = {
      id: nanoid(),
      type: "text",
      label: "",
      required: false,
      options: [],
      condition: null
    };
    setSurvey((prev) => ({ ...prev, questions: [...prev.questions, newQuestion] }));
  };

  const updateQuestion = (id, updatedQuestion) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => (question.id === id ? updatedQuestion : question))
    }));
  };

  const removeQuestion = (id) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== id)
    }));
  };

  const moveQuestion = (id, direction) => {
    setSurvey((prev) => {
      const index = prev.questions.findIndex((question) => question.id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || targetIndex < 0 || targetIndex >= prev.questions.length) {
        return prev;
      }
      const nextQuestions = [...prev.questions];
      const [moved] = nextQuestions.splice(index, 1);
      nextQuestions.splice(targetIndex, 0, moved);
      return { ...prev, questions: nextQuestions };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(survey);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="section-card space-y-4 p-6">
        <Input
          label="Survey Title"
          value={survey.title}
          onChange={(event) => setSurvey((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Cozy Gamer Preferences"
        />
        <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
          <span>Description</span>
          <textarea
            className="input-base min-h-[120px]"
            value={survey.description}
            onChange={(event) => setSurvey((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="A friendly intro for your survey"
          />
        </label>
      </div>

      <div className="space-y-4">
        {survey.questions.length === 0 ? (
          <EmptyState
            title="No questions yet"
            description="Add your first question to start building the survey flow."
            actionLabel="Add Question"
            onAction={addQuestion}
          />
        ) : (
          survey.questions.map((question, index) => (
            <QuestionEditor
              key={question.id}
              question={question}
              index={index}
              total={survey.questions.length}
              questions={survey.questions}
              onChange={(updated) => updateQuestion(question.id, updated)}
              onRemove={removeQuestion}
              onMove={moveQuestion}
            />
          ))
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="secondary" onClick={addQuestion}>
          Add Question
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Survey"}
        </Button>
      </div>
    </form>
  );
};

export default SurveyBuilder;
