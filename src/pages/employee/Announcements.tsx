import { useQuery } from "@tanstack/react-query";

import api from "../../services/api";
import type { Announcement } from "../../types";

export default function Announcements() {
  const { data = [] } = useQuery<Announcement[]>({
    queryKey: ["announcements"],

    queryFn: async () => {
      const response = await api.get("/announcements");
      return response.data.data || [];
    },
  });

  return (
    <div className="text-slate-900 transition-colors dark:text-slate-100">
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-indigo-700 dark:text-indigo-400">
          ANNOUNCEMENTS
        </p>

        <h1 className="m-0 text-3xl font-extrabold text-slate-900 dark:text-white">
          Company updates
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {data.map((announcement) => (
          <article
            className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
            key={announcement._id || announcement.id}
          >
            <p className="text-xs font-extrabold tracking-[.13em] text-indigo-700 dark:text-indigo-400">
              COMPANY UPDATE
            </p>

            <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
              {announcement.title}
            </h2>

            <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-600 dark:text-slate-300">
              {announcement.message}
            </p>
          </article>
        ))}

        {!data.length && (
          <p className="text-slate-600 dark:text-slate-400">
            No announcements available.
          </p>
        )}
      </div>
    </div>
  );
}