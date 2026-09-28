import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployeeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-slate-900">
            Pinnacle<span className="text-slate-500">Smart Technologies</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500">{user?.designation}</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-slate-200 bg-white p-5 md:block">
          <p className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Employee Portal
          </p>

          <nav className="space-y-2">
            <NavLink to="/employee" end className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/employee/profile" className={linkClass}>
              My Profile
            </NavLink>

            <NavLink to="/employee/attendance" className={linkClass}>
              Attendance
            </NavLink>

            <NavLink to="/employee/leave" className={linkClass}>
              Leave
            </NavLink>

            <NavLink to="/employee/tasks" className={linkClass}>
              Tasks
            </NavLink>

            <NavLink to="/employee/announcements" className={linkClass}>
              Announcements
            </NavLink>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
            <NavLink to="/employee" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/employee/profile" className={linkClass}>
              Profile
            </NavLink>
            <NavLink to="/employee/attendance" className={linkClass}>
              Attendance
            </NavLink>
            <NavLink to="/employee/leave" className={linkClass}>
              Leave
            </NavLink>
            <NavLink to="/employee/tasks" className={linkClass}>
              Tasks
            </NavLink>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}