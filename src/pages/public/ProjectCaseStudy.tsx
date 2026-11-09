
import { Link, useParams } from "react-router-dom";

import {
  usePublicProjectQuery
} from "../../hooks/projectHooks";

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: project,
    isLoading,
    isError
  } = usePublicProjectQuery(slug);

  if (!slug || isError || (!isLoading && !project)) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-center text-slate-900 dark:bg-black dark:text-white">
        <h1 className="text-2xl font-bold">
          Project unavailable
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Project not found or unavailable.
        </p>

        <Link
          to="/projects"
          className="mt-6 inline-block text-blue-700 dark:text-blue-400"
        >
          Back to Projects
        </Link>
      </main>
    );
  }

  if (isLoading || !project) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-center text-slate-600 dark:bg-black dark:text-slate-300">
        Loading project details...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-black dark:text-white">
      {/* Project Header */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to Projects
          </Link>

          <p className="mt-10 text-sm font-bold uppercase tracking-widest text-slate-400">
            {project.category}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {project.summary || project.description}
          </p>

          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="mt-10 max-h-96 w-full rounded-2xl object-cover"
            />
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="mx-auto max-w-5xl space-y-14 px-6 py-16">
        {/* Challenge */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Challenge
          </h2>

          <p className="mt-4 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-300">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Solution
          </h2>

          <p className="mt-4 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-300">
            {project.solution}
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Key Features
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {(project.features || []).map((feature, index) => (
              <li
                key={`${index}-${feature}`}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 font-bold text-emerald-600 dark:text-emerald-400"
                >
                  ✓
                </span>

                <span className="leading-7 text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Technologies Used
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {(project.technologies || []).map(
              (technology, index) => (
                <span
                  key={`${index}-${technology}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-200"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </div>

        {/* Project Website */}
        {project.projectUrl && (
          <div>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-600"
            >
              Visit Project
            </a>
          </div>
        )}

        {/* Back Button */}
        <div className="border-t border-slate-200 pt-8 dark:border-zinc-800">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Explore Other Projects
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
