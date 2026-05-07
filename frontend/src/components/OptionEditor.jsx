import Button from "./Button.jsx";

const OptionEditor = ({ options, onChange }) => {
  const updateOption = (index, value) => {
    const next = options.map((option, optionIndex) =>
      optionIndex === index ? value : option
    );
    onChange(next);
  };

  const addOption = () => {
    onChange([...options, ""]);
  };

  const removeOption = (index) => {
    onChange(options.filter((_, optionIndex) => optionIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Options</span>
        <Button type="button" variant="secondary" onClick={addOption}>
          Add Option
        </Button>
      </div>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="input-base"
              value={option}
              onChange={(event) => updateOption(index, event.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <Button type="button" variant="secondary" onClick={() => removeOption(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionEditor;
