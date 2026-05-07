import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSurveyAnalytics, fetchSurveyById } from "../api/surveys.js";
import AnalyticsDashboard from "../components/AnalyticsDashboard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const SurveyAnalytics = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      setError("");
      try {
        const [surveyData, analyticsData] = await Promise.all([
          fetchSurveyById(id),
          fetchSurveyAnalytics(id)
        ]);
        setSurvey(surveyData);
        setAnalytics(analyticsData);
      } catch (err) {
        setError("Unable to load analytics.");
      }
    };
    loadAnalytics();
  }, [id]);

  if (!analytics) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <ErrorMessage message={error} />
        <LoadingSpinner label="Loading analytics" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="section-card space-y-2 p-6">
        <h1 className="font-display text-2xl text-deep">{survey?.title || "Survey Analytics"}</h1>
        <p className="text-sm text-slate-600">See how respondents answered your questions.</p>
      </div>
      <ErrorMessage message={error} />
      <AnalyticsDashboard analytics={analytics} />
    </div>
  );
};

export default SurveyAnalytics;
