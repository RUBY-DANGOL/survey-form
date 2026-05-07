const ConditionalLogicEditor = ({ condition, questions, onChange }) => {
  const handleQuestionChange = (value) => {
    if (!value) {
      onChange(null);
      return;
    }
    onChange({ questionId: value, operator: "equals", value: "" });
  };

  return (
    <div className="space-y-2 rounded-xl border border-baby/70 bg-baby/30 p-4">
      <span className="text-sm font-semibold text-deep">Conditional Logic</span>
      <label className="flex flex-col gap-2 text-sm text-slate-700">
        <span>Show when</span>
        <select
          className="input-base"
          value={condition?.questionId || ""}
          onChange={(event) => handleQuestionChange(event.target.value)}
        >
          <option value="">No condition</option>
          {questions.map((question) => (
            <option key={question.id} value={question.id}>
              {question.label || "Untitled question"}
            </option>
          ))}
        </select>
      </label>
      {condition?.questionId && (
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          <span>Equals</span>
          <input
            className="input-base"
            value={condition.value}
            onChange={(event) => onChange({ ...condition, value: event.target.value })}
            placeholder="Type the matching answer"
          />
        </label>
      )}
    </div>
  );
};

export default ConditionalLogicEditor;
