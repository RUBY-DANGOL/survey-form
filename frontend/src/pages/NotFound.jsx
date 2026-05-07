import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="section-card space-y-3 p-8 text-center">
        <h1 className="font-display text-2xl text-deep">Page Not Found</h1>
        <p className="text-sm text-slate-600">This page does not exist yet.</p>
        <Link to="/admin">
          <Button type="button">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
