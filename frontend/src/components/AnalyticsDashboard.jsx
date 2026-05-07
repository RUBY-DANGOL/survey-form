const AnalyticsDashboard = ({ analytics }) => {
  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <div className="section-card flex items-center justify-between p-6">
        <div>
          <h2 className="font-display text-xl text-deep">Responses</h2>
          <p className="text-sm text-slate-600">Total responses collected</p>
        </div>
        <span className="text-3xl font-display text-deep">{analytics.totalResponses}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {analytics.questions.map((question) => (
          <div key={question.id} className="card-outline space-y-3 p-5">
            <div>
              <h3 className="font-display text-base text-deep">{question.label}</h3>
              <p className="text-xs uppercase text-slate-500">{question.type}</p>
            </div>
            {question.type === "rating" && (
              <div className="text-sm text-slate-700">
                Average rating: <span className="font-semibold text-deep">{question.average}</span>
              </div>
            )}
            {(question.type === "single" || question.type === "multi") && (
              <ul className="space-y-2 text-sm text-slate-700">
                {question.options.map((option) => (
                  <li key={option.option} className="flex items-center justify-between">
                    <span>{option.option}</span>
                    <span className="badge">{option.count}</span>
                  </li>
                ))}
              </ul>
            )}
            {question.type === "text" && (
              <ul className="space-y-2 text-sm text-slate-700">
                {question.answers.length === 0 ? (
                  <li className="text-slate-500">No text answers yet.</li>
                ) : (
                  question.answers.map((answer, index) => <li key={`${question.id}-${index}`}>{answer}</li>)
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
