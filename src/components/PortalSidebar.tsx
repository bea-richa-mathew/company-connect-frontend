import {
  NavLink
} from "react-router-dom";

export default function PortalSidebar() {
  const link = ({
    isActive
  }: {
    isActive: boolean;
  }) =>
    `rounded-lg px-3 py-3 ${
      isActive
        ? "bg-[#3155d9] text-white"
        : "text-[#b8c0d1] hover:bg-[#3155d9] hover:text-white"
    }`;

  return (
    <aside className="w-full shrink-0 bg-[#172033] p-4 text-white md:w-60 md:p-6">
      <div className="px-3 pb-5 text-xl font-extrabold">
        Employee Panel
      </div>

      <nav className="flex gap-1 overflow-x-auto md:grid">
        <NavLink
          to="/employee"
          end
          className={link}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employee/profile"
          className={link}
        >
          My Profile
        </NavLink>

        <NavLink
          to="/employee/attendance"
          className={link}
        >
          Attendance
        </NavLink>

        <NavLink
          to="/employee/leave"
          className={link}
        >
          Leave Management
        </NavLink>

        <NavLink
          to="/employee/tasks"
          className={link}
        >
          My Tasks
        </NavLink>

        <NavLink
          to="/employee/announcements"
          className={link}
        >
          Announcements
        </NavLink>
        <NavLink to="/settings">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}