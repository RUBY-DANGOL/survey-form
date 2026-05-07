const Card = ({ className = "", children }) => {
  return <div className={`section-card p-6 ${className}`}>{children}</div>;
};

export default Card;
