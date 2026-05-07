import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSurveyById, updateSurvey } from "../api/surveys.js";
import SurveyBuilder from "../components/SurveyBuilder.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const EditSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSurvey = async () => {
      setError("");
      try {
        const data = await fetchSurveyById(id);
        setSurvey(data);
      } catch (err) {
        setError("Unable to load this survey.");
      }
    };
    loadSurvey();
  }, [id]);

  const handleSubmit = async (updatedSurvey) => {
    setSaving(true);
    setError("");
    try {
      await updateSurvey(id, updatedSurvey);
      navigate("/admin");
    } catch (err) {
      setError("Unable to update the survey.");
    } finally {
      setSaving(false);
    }
  };

  if (!survey) {
    return <LoadingSpinner label="Loading survey" />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="section-card space-y-2 p-6">
        <h1 className="font-display text-2xl text-deep">Edit Survey</h1>
        <p className="text-sm text-slate-600">Update questions, logic, and details.</p>
      </div>
      <ErrorMessage message={error} />
      <SurveyBuilder initialSurvey={survey} onSubmit={handleSubmit} isSaving={saving} />
    </div>
  );
};

export default EditSurvey;
