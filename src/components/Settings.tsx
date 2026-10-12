
import { useEffect, useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("website-theme") !== "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem(
      "website-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  function resetSettings() {
    setDarkMode(true);
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-900 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your website preferences.
        </p>

        <section className="mt-8 rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold">
            Appearance
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Choose how the website looks.
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <span>Dark mode</span>

            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              aria-pressed={darkMode}
              className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-700"
            >
              {darkMode ? "Turn off" : "Turn on"}
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Current theme: {darkMode ? "Dark" : "Light"}
          </p>
        </section>

        <section className="mt-5 rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold">
            Reset preferences
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Restore the default dark theme.
          </p>

          <button
            type="button"
            onClick={resetSettings}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Reset settings
          </button>
        </section>
      </div>
    </div>
  );
}
