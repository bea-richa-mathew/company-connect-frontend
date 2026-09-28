const services = [
  {
    title: "Web Development",
    description:
      "Responsive and scalable websites and web applications using modern technologies.",
    points: ["React applications", "TypeScript development", "API integration"],
  },
  {
    title: "Mobile Development",
    description:
      "Mobile applications designed around usability, performance and business needs.",
    points: ["Cross-platform apps", "API integration", "Responsive experiences"],
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud-based solutions that support reliable and scalable business operations.",
    points: ["Cloud architecture", "Deployment", "Application monitoring"],
  },
  {
    title: "AI & Automation",
    description:
      "Intelligent tools and automation workflows that reduce repetitive work.",
    points: ["AI integrations", "Workflow automation", "Data-driven solutions"],
  },
  {
    title: "Software Consulting",
    description:
      "Technical guidance to help organizations choose suitable technologies and approaches.",
    points: ["Architecture", "Technology selection", "Technical planning"],
  },
  {
    title: "Quality Engineering",
    description:
      "Testing practices designed to improve reliability and software quality.",
    points: ["Functional testing", "API testing", "Application validation"],
  },
];

export default function Services() {
  return (
    <div>
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Services
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold">
            Solutions built for modern organizations.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h2 className="text-xl font-bold">{service.title}</h2>

              <p className="mt-4 leading-7 text-slate-600">
                {service.description}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {service.points.map((point) => (
                  <li key={point}>✓ {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}