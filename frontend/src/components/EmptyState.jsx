import Button from "./Button.jsx";

const EmptyState = ({ title, description, actionLabel, onAction, imageSrc, imageAlt }) => {
  return (
    <div className="card-outline flex flex-col items-center gap-4 p-6 text-center">
      {imageSrc && (
        <div className="sticker">
          <img src={imageSrc} alt={imageAlt || "Empty state illustration"} className="h-32 w-32" />
        </div>
      )}
      <div>
        <h3 className="font-display text-lg text-deep">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      {actionLabel && (
        <Button type="button" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
