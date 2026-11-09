import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isAuthenticated, userRole, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-[#3155d9] dark:text-cyan-400 font-semibold"
        : "text-gray-600 dark:text-gray-300"
    } hover:text-[#3155d9] dark:hover:text-cyan-400`;

  const drawerLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-base transition-colors ${
      isActive
        ? "bg-[#3155d9] text-white font-semibold"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Sliding Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={closeMenu}
          />

          {/* Drawer */}
          <div className="relative z-10 flex h-full w-72 flex-col justify-between bg-[#172033] p-5 text-white shadow-2xl">
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-gray-700/60 pb-4">
                <span className="text-lg font-black tracking-wide text-white">
                  More <span className="text-[#3155d9]">Pages</span>
                </span>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="cursor-pointer rounded-lg p-1.5 text-gray-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close Menu"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-1.5">
                {/* Core links on mobile */}
                <div className="mb-2 flex flex-col gap-1.5 border-b border-gray-700/60 pb-3 md:hidden">
                  <NavLink
                    to="/"
                    className={drawerLinkClass}
                    end
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/about"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    About
                  </NavLink>

                  <NavLink
                    to="/services"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    Services
                  </NavLink>

                  <NavLink
                    to="/careers"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    Careers
                  </NavLink>
                </div>

                {/* Secondary links */}
                <NavLink
                  to="/projects"
                  className={drawerLinkClass}
                  onClick={closeMenu}
                >
                  Projects
                </NavLink>

                <NavLink
                  to="/contact"
                  className={drawerLinkClass}
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/settings"
                  className={drawerLinkClass}
                  onClick={closeMenu}
                >
                  Settings
                </NavLink>

                {/* Employee Portal: employees only */}
                {isAuthenticated && userRole === "employee" && (
                  <NavLink
                    to="/employee"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    Employee Portal
                  </NavLink>
                )}

                {/* Theme switch */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <span>
                    {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  </span>
                  <span>{isDark ? "☀️" : "🌙"}</span>
                </button>
              </nav>
            </div>

            {/* Mobile Login / Logout */}
            <div className="border-t border-gray-700/60 pt-4 md:hidden">
              {isAuthenticated ? (
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-xl border border-[#3155d9] bg-transparent py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#3155d9]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="block w-full rounded-xl bg-[#3155d9] py-2.5 text-center text-sm font-semibold text-white shadow-xs transition hover:bg-[#2846b8]"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-gray-200 bg-white px-[6%] py-4 text-gray-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-xl border border-[#3155d9]/30 bg-[#3155d9]/10 p-2.5 text-[#3155d9] shadow-xs transition hover:bg-[#3155d9] hover:text-white"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg
              className="h-6 w-6 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Company Logo */}
          <Link
            to="/"
            className="text-[1.35rem] font-extrabold text-gray-900 dark:text-white"
          >
            Pinnacle{" "}
            <span className="text-[#3155d9] dark:text-cyan-400">
              Smart Technology
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>

          <NavLink to="/careers" className={linkClass}>
            Careers
          </NavLink>

          {/* Only employees see this link */}
          {isAuthenticated && userRole === "employee" && (
            <NavLink to="/employee" className={linkClass}>
              Employee Portal
            </NavLink>
          )}

          {isAuthenticated ? (
            <button
              type="button"
              className="cursor-pointer border-0 bg-transparent text-sm text-gray-600 transition hover:text-[#3155d9] dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink
              className="rounded-lg border border-[#3155d9] px-4 py-2 text-sm text-[#3155d9] transition hover:bg-[#3155d9] hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-black"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>
    </>
  );
}
