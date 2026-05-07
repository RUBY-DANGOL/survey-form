import { Link, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";

const ThankYou = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="section-card space-y-3 p-8 text-center">
        <h1 className="font-display text-2xl text-deep">Thanks for sharing!</h1>
        <p className="text-sm text-slate-600">
          Your response has been saved. We appreciate your time.
        </p>
        <div className="flex justify-center gap-3">
          <Link to={`/survey/${id}`}>
            <Button type="button" variant="secondary">Submit Another</Button>
          </Link>
          <Link to="/admin">
            <Button type="button">Back to Admin</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
