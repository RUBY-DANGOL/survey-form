const QuestionTypeSelector = ({ value, onChange }) => {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
      <span>Question Type</span>
      <select
        className="input-base"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="text">Text</option>
        <option value="single">Multiple Choice</option>
        <option value="multi">Checkboxes</option>
        <option value="rating">Rating (1-5)</option>
      </select>
    </label>
  );
};

export default QuestionTypeSelector;
