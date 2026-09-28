const projects = [
  {
    title: "Enterprise Management Platform",
    category: "Business Software",
    description:
      "A centralized platform designed to manage employees, workflows and business operations.",
  },
  {
    title: "Healthcare Digital Platform",
    category: "Healthcare",
    description:
      "A digital platform designed to make healthcare information and appointment workflows easier to manage.",
  },
  {
    title: "AI Content Optimizer",
    category: "Artificial Intelligence",
    description:
      "An AI-powered solution for creating and evaluating digital content.",
  },
  {
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
              key={project.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <span className="text-sm font-semibold text-slate-400">
                0{index + 1}
              </span>

              <p className="mt-8 text-sm font-semibold text-slate-500">
                {project.category}
              </p>

              <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>

              <p className="mt-4 leading-7 text-slate-600">
                {project.description}
              </p>

              <button className="mt-7 font-semibold text-slate-900">
                View Case Study →
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}