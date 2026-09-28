import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-slate-900"
        : "text-slate-600 hover:text-slate-900"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          Pinnacle<span className="text-slate-500">Smart Technologies</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>

          <NavLink to="/projects" className={navClass}>
            Projects
          </NavLink>

          <NavLink to="/careers" className={navClass}>
            Careers
          </NavLink>

          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/employee"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Employee Portal
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Employee Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="text-2xl md:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <NavLink to="/" onClick={() => setOpen(false)} className={navClass}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={() => setOpen(false)} className={navClass}>
              About
            </NavLink>

            <NavLink to="/services" onClick={() => setOpen(false)} className={navClass}>
              Services
            </NavLink>

            <NavLink to="/projects" onClick={() => setOpen(false)} className={navClass}>
              Projects
            </NavLink>

            <NavLink to="/careers" onClick={() => setOpen(false)} className={navClass}>
              Careers
            </NavLink>

            <NavLink to="/contact" onClick={() => setOpen(false)} className={navClass}>
              Contact
            </NavLink>

            {isAuthenticated ? (
              <>
                <Link
                  to="/employee"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Employee Portal
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-left text-sm text-slate-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Employee Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}