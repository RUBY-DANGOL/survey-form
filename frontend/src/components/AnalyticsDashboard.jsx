const emptyCatUrl = new URL("../../img/cat-survey.png", import.meta.url).href;

const getTotalCount = (options) => options.reduce((sum, item) => sum + item.count, 0);

const getRatingDistribution = (answers) => {
  const buckets = [0, 0, 0, 0, 0];
  answers.forEach((value) => {
    if (Number.isInteger(value) && value >= 1 && value <= 5) {
      buckets[value - 1] += 1;
    }
  });
  return buckets;
};

const AnalyticsDashboard = ({ analytics }) => {
  if (!analytics) return null;

  if (analytics.totalResponses === 0) {
    return (
      <div className="card-outline flex flex-col items-center gap-4 p-8 text-center">
        <div className="sticker">
          <img src={emptyCatUrl} alt="Cute cat with magnifier" className="h-32 w-32" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-lg text-deep">No responses yet</h3>
          <p className="text-sm text-slate-600">
            Share your public link to start collecting answers.
          </p>
        </div>
      </div>
    );
  }

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
              <div className="space-y-3">
                {question.options.map((option) => {
                  const total = getTotalCount(question.options) || 1;
                  const percent = Math.round((option.count / total) * 100);
                  return (
                    <div key={option.option} className="space-y-1 text-sm text-slate-700">
                      <div className="flex items-center justify-between">
                        <span>{option.option}</span>
                        <span className="badge">{option.count}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-cream/70">
                        <div
                          className="h-2 rounded-full bg-deep/70"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
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
            {question.type === "rating" && question.answers && (
              <div className="space-y-2 text-sm text-slate-700">
                {getRatingDistribution(question.answers).map((count, index) => {
                  const total = question.answers.length || 1;
                  const percent = Math.round((count / total) * 100);
                  const label = index + 1;
                  return (
                    <div key={`${question.id}-rating-${label}`} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span>{label} star</span>
                        <span className="badge">{count}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-cream/70">
                        <div
                          className="h-2 rounded-full bg-deep/70"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
