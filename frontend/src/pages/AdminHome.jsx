import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSurveys, deleteSurvey } from "../api/surveys.js";
import SurveyCard from "../components/SurveyCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import EmptyState from "../components/EmptyState.jsx";

const catSurveyUrl = new URL("../../img/cat-survey.png", import.meta.url).href;
const clipboardUrl = new URL("../../img/clipboard-cute.png", import.meta.url).href;

const AdminHome = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadSurveys = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSurveys();
      setSurveys(data);
    } catch (err) {
      setError("Unable to load surveys right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSurvey(id);
      loadSurveys();
    } catch (err) {
      setError("Failed to delete the survey.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="section-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="font-display text-2xl text-deep">Survey Command Center</h1>
          <p className="text-sm text-slate-600">
            Manage your surveys, share links, and view analytics.
          </p>
        </div>
        <div className="sticker">
          <img src={clipboardUrl} alt="Cute clipboard" className="h-20 w-20" />
        </div>
      </div>

      <ErrorMessage message={error} />
      {loading ? (
        <LoadingSpinner label="Loading surveys" />
      ) : surveys.length === 0 ? (
        <EmptyState
          title="No surveys yet"
          description="Create your first survey to start collecting responses."
          actionLabel="Create a Survey"
          onAction={() => navigate("/admin/create")}
          imageSrc={catSurveyUrl}
          imageAlt="Cute cat survey"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {surveys.map((survey) => (
            <SurveyCard key={survey._id} survey={survey} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
