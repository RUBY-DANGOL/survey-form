const Input = ({ label, id, className = "", ...props }) => {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
      {label && <span>{label}</span>}
      <input id={id} className={`input-base ${className}`} {...props} />
    </label>
  );
};

export default Input;
