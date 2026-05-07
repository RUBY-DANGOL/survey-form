import Button from "./Button.jsx";
import Input from "./Input.jsx";
import OptionEditor from "./OptionEditor.jsx";
import QuestionTypeSelector from "./QuestionTypeSelector.jsx";
import ConditionalLogicEditor from "./ConditionalLogicEditor.jsx";

const QuestionEditor = ({ question, index, total, questions, onChange, onRemove, onMove }) => {
  const updateField = (field, value) => {
    onChange({ ...question, [field]: value });
  };

  const updateCondition = (condition) => {
    onChange({ ...question, condition });
  };

  const supportsOptions = question.type === "single" || question.type === "multi";

  return (
    <div className="card-outline space-y-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="badge">Question {index + 1}</span>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onMove(question.id, "up")}
            disabled={index === 0}
          >
            Move Up
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onMove(question.id, "down")}
            disabled={index === total - 1}
          >
            Move Down
          </Button>
          <Button type="button" variant="secondary" onClick={() => onRemove(question.id)}>
            Remove
          </Button>
        </div>
      </div>
      <Input
        label="Question Label"
        value={question.label}
        onChange={(event) => updateField("label", event.target.value)}
        placeholder="Write your question"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <QuestionTypeSelector value={question.type} onChange={(value) => updateField("type", value)} />
        <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(event) => updateField("required", event.target.checked)}
          />
          Required
        </label>
      </div>
      {supportsOptions && (
        <OptionEditor
          options={question.options || []}
          onChange={(options) => updateField("options", options)}
        />
      )}
      <ConditionalLogicEditor
        condition={question.condition}
        questions={questions.filter((item) => item.id !== question.id)}
        onChange={updateCondition}
      />
    </div>
  );
};

export default QuestionEditor;
