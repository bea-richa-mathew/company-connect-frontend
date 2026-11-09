import { useEffect, useState, type FormEvent } from "react";

type Preferences = {
  zoom: number;
  compactView: boolean;
  notificationsEnabled: boolean;
  autoRefresh: boolean;
};

const STORAGE_KEY = "website-settings";

const defaultPreferences: Preferences = {
  zoom: 100,
  compactView: false,
  notificationsEnabled: true,
  autoRefresh: true,
};

function loadPreferences(): Preferences {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultPreferences;
    }

    const parsed = JSON.parse(saved);

    return {
      zoom:
        typeof parsed.zoom === "number"
          ? Math.min(130, Math.max(80, parsed.zoom))
          : 100,
      compactView: parsed.compactView === true,
      notificationsEnabled:
        parsed.notificationsEnabled !== false,
      autoRefresh: parsed.autoRefresh !== false,
    };
  } catch {
    return defaultPreferences;
  }
}

export default function Settings() {
  const [preferences, setPreferences] =
    useState<Preferences>(loadPreferences);

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<
    "success" | "error"
  >("success");

  // Apply zoom throughout the website.
  useEffect(() => {
    document.documentElement.style.zoom =
      `${preferences.zoom}%`;

    return () => {
      document.documentElement.style.zoom = "";
    };
  }, [preferences.zoom]);

  // Apply the compact-view preference globally.
  useEffect(() => {
    document.documentElement.dataset.compactView =
      String(preferences.compactView);

    return () => {
      delete document.documentElement.dataset.compactView;
    };
  }, [preferences.compactView]);

  // Save changes and display feedback.
  const showMessage = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setStatusMessage(message);
    setStatusType(type);
  };

  const updatePreference = <K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSavePreferences = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences)
      );

      showMessage("Your preferences have been saved.");
    } catch {
      showMessage(
        "Unable to save preferences. Check your browser storage settings.",
        "error"
      );
    }
  };

  const changeZoom = (amount: number) => {
    setPreferences((current) => ({
      ...current,
      zoom: Math.min(
        130,
        Math.max(80, current.zoom + amount)
      ),
    }));
  };

  const resetZoom = () => {
    updatePreference("zoom", 100);
  };

  const handleResetPreferences = () => {
    setPreferences(defaultPreferences);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultPreferences)
      );

      showMessage("Settings restored to their defaults.");
    } catch {
      showMessage(
        "Settings were reset temporarily but could not be saved.",
        "error"
      );
    }
  };

  const handleClearCache = () => {
    try {
      // Preserve authentication-related session entries.
      const preservedEntries = Object.entries(sessionStorage)
        .filter(([key]) =>
          /token|auth|login|session/i.test(key)
        );

      sessionStorage.clear();

      preservedEntries.forEach(([key, value]) => {
        sessionStorage.setItem(key, value);
      });

      showMessage(
        "Temporary session storage cleared. Login-related entries were preserved."
      );
    } catch {
      showMessage(
        "Unable to clear session storage.",
        "error"
      );
    }
  };

  const fieldClass =
    "h-5 w-5 cursor-pointer accent-[#3155d9]";

  const sectionClass =
    "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6";

  const headingClass =
    "mb-1 text-lg font-bold text-gray-900 dark:text-white";

  const descriptionClass =
    "text-sm text-gray-500 dark:text-gray-400";

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      {/* Page heading */}
      <header className="border-b border-gray-200 pb-5 dark:border-zinc-800">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Personalize your display, manage preferences, and
          control local application settings.
        </p>
      </header>

      {/* Feedback */}
      {statusMessage && (
        <div
          role="status"
          className={`rounded-xl border p-4 text-sm font-medium ${
            statusType === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form
        onSubmit={handleSavePreferences}
        className="space-y-6"
      >
        {/* Display and zoom */}
        <section className={sectionClass}>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/15">
              🔍
            </div>

            <div>
              <h2 className={headingClass}>
                Display & Zoom
              </h2>
              <p className={descriptionClass}>
                Adjust how large the website appears.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-zinc-800">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Website zoom
                </p>
                <p className={descriptionClass}>
                  Increase or decrease the overall page scale.
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                {preferences.zoom}%
              </span>
            </div>

            <input
              type="range"
              min={80}
              max={130}
              step={10}
              value={preferences.zoom}
              onChange={(event) =>
                updatePreference(
                  "zoom",
                  Number(event.target.value)
                )
              }
              aria-label="Website zoom percentage"
              className="w-full cursor-pointer accent-[#3155d9]"
            />

            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>80%</span>
              <span>100%</span>
              <span>130%</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => changeZoom(-10)}
                disabled={preferences.zoom <= 80}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
              >
                − Zoom out
              </button>

              <button
                type="button"
                onClick={() => changeZoom(10)}
                disabled={preferences.zoom >= 130}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
              >
                + Zoom in
              </button>

              <button
                type="button"
                onClick={resetZoom}
                className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:hover:bg-blue-500/25"
              >
                Reset to 100%
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-zinc-800">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Compact View
              </p>
              <p className={descriptionClass}>
                Enable compact layout mode where supported.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.compactView}
              onChange={(event) =>
                updatePreference(
                  "compactView",
                  event.target.checked
                )
              }
              aria-label="Enable compact view"
              className={fieldClass}
            />
          </div>
        </section>

        {/* Notifications and refresh */}
        <section className={sectionClass}>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-xl dark:bg-amber-500/15">
              🔔
            </div>

            <div>
              <h2 className={headingClass}>
                Notifications & Updates
              </h2>
              <p className={descriptionClass}>
                Manage your preferred application behavior.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                In-App Notifications
              </p>
              <p className={descriptionClass}>
                Allow in-app notification alerts where supported.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.notificationsEnabled}
              onChange={(event) =>
                updatePreference(
                  "notificationsEnabled",
                  event.target.checked
                )
              }
              aria-label="Enable in-app notifications"
              className={fieldClass}
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-zinc-800">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Auto Data Refresh
              </p>
              <p className={descriptionClass}>
                Enable automatic data refresh where supported.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.autoRefresh}
              onChange={(event) =>
                updatePreference(
                  "autoRefresh",
                  event.target.checked
                )
              }
              aria-label="Enable automatic data refresh"
              className={fieldClass}
            />
          </div>
        </section>

        {/* Maintenance */}
        <section className={sectionClass}>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl dark:bg-purple-500/15">
              ⚙️
            </div>

            <div>
              <h2 className={headingClass}>
                Maintenance
              </h2>
              <p className={descriptionClass}>
                Manage temporary browser session data.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleClearCache}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
            >
              Clear Session Data
            </button>

            <button
              type="button"
              onClick={handleResetPreferences}
              className="rounded-xl border border-amber-300 px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-500/10"
            >
              Reset Preferences
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Clearing session data may remove temporary application
            state. Authentication-related entries are preserved
            when their keys are identifiable.
          </p>
        </section>

        {/* Save */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Remember to save your preferences.
          </p>

          <button
            type="submit"
            className="rounded-xl bg-[#3155d9] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2846b8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}