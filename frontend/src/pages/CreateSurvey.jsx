import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSurvey } from "../api/surveys.js";
import SurveyBuilder from "../components/SurveyBuilder.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { createEmptySurvey } from "../utils/surveyDefaults.js";

const CreateSurvey = () => {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (survey) => {
    setSaving(true);
    setError("");
    try {
      const created = await createSurvey(survey);
      navigate(`/admin/surveys/${created._id}/edit`);
    } catch (err) {
      setError("Unable to save the survey.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="section-card space-y-2 p-6">
        <h1 className="font-display text-2xl text-deep">Create a Survey</h1>
        <p className="text-sm text-slate-600">Design a form for your audience.</p>
      </div>
      <ErrorMessage message={error} />
      <SurveyBuilder initialSurvey={createEmptySurvey()} onSubmit={handleSubmit} isSaving={saving} />
    </div>
  );
};

export default CreateSurvey;
