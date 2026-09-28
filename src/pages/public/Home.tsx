import { Link } from "react-router-dom";
import { mockJobs } from "../../data/mockData";
import JobCard from "../../components/JobCard";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
          <div>
            <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Technology • People • Innovation
            </span>

            <h1 className="mt-7 text-5xl font-bold tracking-tight md:text-6xl">
              We build technology that moves businesses forward.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Pinnacle Smart Technologies creates modern digital solutions that help organizations
              solve real problems, improve experiences, and grow with
              confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
              >
                Explore Services
              </Link>

              <Link
                to="/careers"
                className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-900"
              >
                Join Our Team
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Our Focus
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["01", "Digital Products"],
                ["02", "Cloud Solutions"],
                ["03", "AI & Automation"],
                ["04", "Engineering"],
              ].map(([number, title]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <span className="text-sm text-slate-500">{number}</span>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            What we do
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Technology designed around real business needs.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            From strategy to development, we help organizations transform
            ideas into reliable digital products.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Web Development",
              text: "Modern, responsive and scalable web applications.",
            },
            {
              title: "Mobile Applications",
              text: "User-friendly mobile experiences for modern businesses.",
            },
            {
              title: "AI & Automation",
              text: "Intelligent solutions that improve productivity and workflows.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Careers
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                Find your next opportunity.
              </h2>
            </div>

            <Link
              to="/careers"
              className="font-semibold text-slate-900 hover:underline"
            >
              View all jobs →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mockJobs.slice(0, 2).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Have an idea? Let's build it together.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            Talk to our team about your business, technology, and digital
            transformation needs.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-900"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}