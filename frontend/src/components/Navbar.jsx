import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import { clearToken, isAuthenticated } from "../utils/auth.js";

const Navbar = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? "bg-white text-deep shadow-soft" : "text-slate-700 hover:bg-white/60"
    }`;

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-white/40 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex flex-col">
          <span className="font-display text-lg text-deep">Survey Builder</span>
          <span className="text-xs text-slate-500">Surveys with real data</span>
        </div>
        <nav className="flex items-center gap-3">
          {authed ? (
            <>
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>
              <NavLink to="/admin/create" className={linkClass}>
                Create Survey
              </NavLink>
              <Button type="button" variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button type="button" variant="secondary" onClick={() => navigate("/login")}>
              Admin Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
