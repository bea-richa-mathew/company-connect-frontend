
import { Link } from "react-router-dom";

const projects = [
  {
    slug: "enterprise-management-platform",
    title: "Enterprise Management Platform",
    category: "Business Software",
    description:
      "A centralized platform designed to manage employees, workflows and business operations.",
  },
  {
    slug: "healthcare-digital-platform",
    title: "Healthcare Digital Platform",
    category: "Healthcare",
    description:
      "A digital platform designed to make healthcare information and appointment workflows easier to manage.",
  },
  {
    slug: "ai-content-optimizer",
    title: "AI Content Optimizer",
    category: "Artificial Intelligence",
    description:
      "An AI-powered solution for creating and evaluating digital content.",
  },
  {
    slug: "developer-productivity-platform",
    title: "Developer Productivity Platform",
    category: "Developer Tools",
    description:
      "A lightweight platform designed to help developers identify and understand common code issues.",
  },
];

export default function Projects() {
  return (
    <div>
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

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-sm font-semibold text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="mt-8 text-sm font-semibold text-slate-500">
                {project.category}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {project.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {project.description}
              </p>

              <Link
                to={`/projects/${project.slug}`}
                className="mt-7 inline-flex items-center gap-2 font-semibold text-slate-900 transition hover:text-blue-700"
              >
                View Case Study
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
