import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import CreateSurvey from "./pages/CreateSurvey.jsx";
import EditSurvey from "./pages/EditSurvey.jsx";
import SurveyAnalytics from "./pages/SurveyAnalytics.jsx";
import PublicSurvey from "./pages/PublicSurvey.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

const backgroundUrl = new URL("../img/backround saya.jpeg", import.meta.url).href;

const App = () => {
  const location = useLocation();
  const isPublic = location.pathname.startsWith("/survey");

  return (
    <div
      className="min-h-screen app-bg text-slate-800"
      style={{ "--app-bg": `url(${backgroundUrl})` }}
    >
      {isPublic ? null : <Navbar />}
      <main className="flex w-full justify-center px-4 pb-12 pt-6 md:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateSurvey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/surveys/:id/edit"
            element={
              <ProtectedRoute>
                <EditSurvey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/surveys/:id/analytics"
            element={
              <ProtectedRoute>
                <SurveyAnalytics />
              </ProtectedRoute>
            }
          />
          <Route path="/survey/:id" element={<PublicSurvey />} />
          <Route path="/survey/:id/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
