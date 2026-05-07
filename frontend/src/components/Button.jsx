const Button = ({ variant = "primary", className = "", ...props }) => {
  const style = variant === "secondary" ? "button-secondary" : "button-primary";
  return <button className={`${style} ${className}`} {...props} />;
};

export default Button;
