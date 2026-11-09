
import { Link } from "react-router-dom";

import {
  usePublicProjectsQuery
} from "../../hooks/projectHooks";

export default function Projects() {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
    refetch
  } = usePublicProjectsQuery();

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">
      {/* Projects Header */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Projects
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold">
            Digital products solving real-world problems.
          </h1>
        </div>
      </section>

      {/* Projects Content */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        {isLoading ? (
          <p className="text-slate-500 dark:text-slate-400">
            Loading projects...
          </p>
        ) : isError ? (
          <div className="space-y-4">
            <p className="text-red-600 dark:text-red-400">
              {error instanceof Error
                ? error.message
                : "Unable to load projects."}
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No published projects are available yet.
          </p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project._id}
                className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:shadow-black/30 dark:hover:border-zinc-700 dark:hover:shadow-xl"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="mb-6 h-48 w-full rounded-2xl object-cover"
                  />
                )}

                <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-8 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {project.category}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-slate-900 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Case Study
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
