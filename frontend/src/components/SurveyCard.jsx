import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";

const SurveyCard = ({ survey, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const link = `${window.location.origin}/survey/${survey._id}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Unable to copy link", error);
    }
  };

  return (
    <div className="card-outline flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <h3 className="font-display text-lg text-deep">{survey.title}</h3>
          <span className="badge">Public Preview</span>
        </div>
        {copied && (
          <span className="rounded-full bg-baby/70 px-3 py-1 text-xs font-semibold text-deep">
            Link copied!
          </span>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm text-slate-600">{survey.description || "No description yet."}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link to={`/admin/surveys/${survey._id}/edit`}>
          <Button type="button">Edit</Button>
        </Link>
        <Link to={`/admin/surveys/${survey._id}/analytics`}>
          <Button type="button" variant="secondary">Analytics</Button>
        </Link>
        <Button type="button" variant="secondary" onClick={handleCopy}>
          Public Link
        </Button>
        <Button type="button" variant="secondary" onClick={() => onDelete(survey._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SurveyCard;
