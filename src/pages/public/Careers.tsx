import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

import api from "../../services/api";
import type { Job } from "../../types";

export default function Careers() {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await api.get("/jobs");
      return response.data.data || [];
    },
  });

  const filtered = data.filter((job) =>
    `${job.title} ${job.department} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-white px-8 py-20 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-indigo-700 dark:text-indigo-400">
            CAREERS
          </p>

          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Find your next opportunity
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Join a team where you can learn,
            contribute, and grow.
          </p>
        </div>

        <input
          className="mb-6 w-full max-w-xl rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
          placeholder="Search by title, department, or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {isLoading && (
          <p className="text-slate-600 dark:text-slate-300">
            Loading jobs...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-950/40 dark:text-red-300">
            Unable to load jobs.
          </p>
        )}

        {!isLoading && !error && (
          <div className="grid gap-4">
            {filtered.map((job) => {
              const id = job._id || job.id;

              return (
                <article
                  className="flex flex-col justify-between gap-5 rounded-[14px] border border-slate-200 bg-white p-6 transition-colors hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 md:flex-row md:items-center"
                  key={id}
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {job.department} · {job.location}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {job.type}
                      </span>

                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {job.experience}
                      </span>
                    </div>
                  </div>

                  <Link
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    to={`/careers/${id}`}
                  >
                    View Details
                  </Link>
                </article>
              );
            })}

            {!filtered.length && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-9 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                No jobs found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}