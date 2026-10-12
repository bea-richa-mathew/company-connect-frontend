
import {
  Link,
  NavLink
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const {
    user,
    logout
  } = useAuth();

  const linkClass = ({
    isActive
  }: {
    isActive: boolean;
  }) =>
    `text-sm transition-colors ${
      isActive
        ? "text-[#3155d9] dark:text-cyan-400"
        : "text-gray-600 dark:text-gray-300"
    } hover:text-[#3155d9] dark:hover:text-cyan-400`;

  return (
    <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-[6%] py-4 text-gray-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
      <Link
        to="/"
        className="text-[1.35rem] font-extrabold text-gray-900 dark:text-white"
      >
        Pinnacle{" "}
        <span className="text-[#3155d9] dark:text-cyan-400">
          Smart Technology
        </span>
      </Link>

      <nav className="flex flex-wrap items-center gap-5">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>

        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>

        <NavLink to="/careers" className={linkClass}>
          Careers
        </NavLink>

        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>

        {user ? (
          <>
            <NavLink to="/employee" className={linkClass}>
              Employee Portal
            </NavLink>

            <button
              type="button"
              className="border-0 bg-transparent text-sm text-gray-600 hover:text-[#3155d9] dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            className="rounded-lg border border-[#3155d9] px-4 py-2 text-sm text-[#3155d9] hover:bg-[#3155d9] hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-black"
            to="/login"
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}
