import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? "bg-white text-deep shadow-soft" : "text-slate-700 hover:bg-white/60"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-white/40 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex flex-col">
          <span className="font-display text-lg text-deep">Survey Builder</span>
          <span className="text-xs text-slate-500">Surveys with real data</span>
        </div>
        <nav className="flex gap-3">
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
          <NavLink to="/admin/create" className={linkClass}>
            Create Survey
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
