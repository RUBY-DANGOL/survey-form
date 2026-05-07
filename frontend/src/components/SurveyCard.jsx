import { Link } from "react-router-dom";
import Button from "./Button.jsx";

const SurveyCard = ({ survey, onDelete }) => {
  return (
    <div className="card-outline flex flex-col gap-4 p-5">
      <div className="space-y-2">
        <h3 className="font-display text-lg text-deep">{survey.title}</h3>
        <p className="text-sm text-slate-600">{survey.description || "No description yet."}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link to={`/admin/surveys/${survey._id}/edit`}>
          <Button type="button">Edit</Button>
        </Link>
        <Link to={`/admin/surveys/${survey._id}/analytics`}>
          <Button type="button" variant="secondary">Analytics</Button>
        </Link>
        <Link to={`/survey/${survey._id}`}>
          <Button type="button" variant="secondary">Public Link</Button>
        </Link>
        <Button type="button" variant="secondary" onClick={() => onDelete(survey._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SurveyCard;
