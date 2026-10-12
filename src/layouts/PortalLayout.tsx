
import {
  Link,
  Outlet
} from "react-router-dom";

import PortalSidebar from "../components/PortalSidebar";
import { useAuth } from "../context/AuthContext";

export default function PortalLayout() {
  const {
    user,
    logout
  } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-black dark:text-white md:flex-row">
      <PortalSidebar />

      <section className="min-w-0 flex-1 bg-white dark:bg-black">
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 dark:border-zinc-800 dark:bg-zinc-950 md:px-9">
          <Link
            to="/"
            className="text-[1.2rem] font-extrabold text-gray-900 dark:text-white"
          >
            Company
            <span className="text-[#3155d9]">
              Connect
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-800 dark:text-gray-200">
              {user?.name}
            </span>

            <button
              className="rounded-lg border border-[#3155d9] bg-white px-3 py-2 text-[#3155d9] hover:bg-gray-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="min-h-[calc(100vh-5rem)] bg-white p-5 dark:bg-black md:p-9">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
