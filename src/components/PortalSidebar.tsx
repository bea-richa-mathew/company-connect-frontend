
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  CalendarCheck,
  CalendarDays,
  ListTodo,
  FolderKanban,
  Megaphone,
  MessageCircle,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

import { useInternalUnreadCount } from "../hooks/useInternalUnreadCount";

interface PortalSidebarProps {
  onItemClick?: () => void;
}

const links = [
  {
    to: "/employee",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/employee/profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    to: "/employee/attendance",
    label: "Attendance",
    icon: CalendarCheck,
  },
  {
    to: "/employee/leave",
    label: "Leave",
    icon: CalendarDays,
  },
  {
    to: "/employee/tasks",
    label: "Tasks",
    icon: ListTodo,
  },
  {
    to: "/employee/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    to: "/employee/announcements",
    label: "Announcements",
    icon: Megaphone,
  },
  {
    to: "/employee/messages",
    label: "Messages",
    icon: MessageCircle,
  },
  {
    to: "/employee/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function PortalSidebar({
  onItemClick,
}: PortalSidebarProps) {
  const { data: unreadCount = 0 } =
    useInternalUnreadCount();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";

    setIsDark(!isDark);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );

    document.documentElement.dataset.theme = newTheme;
  };

  return (
    <nav
      className="flex flex-col gap-1"
      aria-label="Employee navigation"
    >
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/employee"}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Icon size={19} className="shrink-0" />

          <span className="flex-1">
            {label}
          </span>

          {to === "/employee/messages" &&
            unreadCount > 0 && (
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
        </NavLink>
      ))}

      {/* Single Light / Dark Mode Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        {isDark ? (
          <Sun size={19} className="shrink-0" />
        ) : (
          <Moon size={19} className="shrink-0" />
        )}

        <span>
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </nav>
  );
}
