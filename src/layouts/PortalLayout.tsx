import { useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { MessageCircle } from "lucide-react";

import PortalSidebar from "../components/PortalSidebar";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "../components/NotificationBell";
import { useInternalUnreadCount } from "../hooks/useInternalUnreadCount";

export default function PortalLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { data: unreadCount = 0 } =
    useInternalUnreadCount();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-black dark:text-white">
      {/* Sliding Sidebar Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={closeMenu}
          />

          {/* Sliding Sidebar */}
          <div className="relative z-10 flex h-full w-64 flex-col justify-between bg-[#172033] p-4 text-white shadow-2xl">
            <div>
              <div className="mb-4 flex items-center justify-between px-3">
                <span className="text-lg font-extrabold tracking-wide text-white">
                  Employee Panel
                </span>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="rounded-lg p-1 text-gray-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close Menu"
                >
                  ✕
                </button>
              </div>

              <PortalSidebar onItemClick={closeMenu} />
            </div>
          </div>
        </div>
      )}

      {/* Main Employee Portal */}
      <section className="flex min-w-0 flex-1 flex-col bg-white dark:bg-black">
        {/* Header */}
        <header className="flex h-20 items-center justify-between gap-3 border-b border-gray-200 bg-white px-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 md:px-9">
          {/* Left Side */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Hamburger Button */}
            <button
              type="button"
              className="flex shrink-0 items-center justify-center rounded-xl border border-[#3155d9]/30 bg-[#3155d9]/10 p-2.5 text-[#3155d9] shadow-xs transition hover:bg-[#3155d9] hover:text-white"
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

            {/* Company Name */}
            <Link
              to="/"
              className="text-[1.2rem] font-extrabold text-gray-900 dark:text-white"
            >
              Company{" "}
              <span className="text-[#3155d9]">
                Connect
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex shrink-0 items-center justify-end gap-3 text-sm font-medium md:gap-4">
            {/* Existing Notification Bell */}
            <NotificationBell />

            {/* Internal Messaging Button */}
            <button
              type="button"
              onClick={() =>
                navigate("/employee/messages")
              }
              className="relative rounded-xl p-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800"
              title="Internal Messages"
              aria-label={`Internal Messages, ${unreadCount} unread`}
            >
              <MessageCircle size={21} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1 text-center text-[10px] font-bold leading-5 text-white">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {/* Employee Portal Label */}
            <span className="hidden whitespace-nowrap text-gray-800 dark:text-gray-200 sm:inline">
              Employee Portal
            </span>

            {/* Logout Button */}
            <button
              type="button"
              className="shrink-0 rounded-xl border border-[#3155d9] bg-white px-3 py-2 font-semibold text-[#3155d9] shadow-xs transition hover:bg-[#3155d9] hover:text-white dark:bg-zinc-900 dark:hover:bg-[#3155d9] dark:hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Employee Page Content */}
        <div className="min-h-[calc(100vh-5rem)] flex-1 bg-white p-5 dark:bg-black md:p-9">
          <Outlet />
        </div>
      </section>
    </div>
  );
}