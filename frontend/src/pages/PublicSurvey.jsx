import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSurveyById } from "../api/surveys.js";
import { submitSurveyResponse } from "../api/responses.js";
import PublicSurveyForm from "../components/PublicSurveyForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const PublicSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadSurvey = async () => {
      setError("");
      try {
        const data = await fetchSurveyById(id);
        setSurvey(data);
      } catch (err) {
        setError("We could not load this survey.");
      }
    };
    loadSurvey();
  }, [id]);

  const handleSubmit = async (answers) => {
    setSubmitting(true);
    setError("");
    try {
      await submitSurveyResponse(id, { answers });
      navigate(`/survey/${id}/thank-you`);
    } catch (err) {
      setError("Unable to submit your response.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!survey) {
    return <LoadingSpinner label="Loading survey" />;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="section-card space-y-2 p-6">
        <h1 className="font-display text-2xl text-deep">{survey.title}</h1>
        <p className="text-sm text-slate-600">{survey.description}</p>
      </div>
      <ErrorMessage message={error} />
      {submitting ? <LoadingSpinner label="Submitting response" /> : null}
      <PublicSurveyForm survey={survey} onSubmit={handleSubmit} />
    </div>
  );
};

export default PublicSurvey;
