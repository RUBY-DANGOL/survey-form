import Button from "./Button.jsx";

const DynamicQuestionRenderer = ({ question, value, onChange }) => {
  if (question.type === "text") {
    return (
      <input
        className="input-base"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your answer"
      />
    );
  }

  if (question.type === "single") {
    return (
      <div className="space-y-2">
        {question.options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "multi") {
    const current = Array.isArray(value) ? value : [];
    const toggle = (option) => {
      if (current.includes(option)) {
        onChange(current.filter((item) => item !== option));
      } else {
        onChange([...current, option]);
      }
    };
    return (
      <div className="space-y-2">
        {question.options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={current.includes(option)}
              onChange={() => toggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "rating") {
    const current = value || 0;
    return (
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            type="button"
            variant={current === rating ? "primary" : "secondary"}
            onClick={() => onChange(rating)}
          >
            {rating}
          </Button>
        ))}
      </div>
    );
  }

  return null;
};

export default DynamicQuestionRenderer;
