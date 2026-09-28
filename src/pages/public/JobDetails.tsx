import { Link, useParams } from "react-router-dom";
import { mockJobs } from "../../data/mockData";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find((item) => item.id === id);

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Job not found</h1>

        <Link
          to="/careers"
          className="mt-6 inline-block font-semibold text-slate-900 underline"
        >
          Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-slate-400">{job.department}</p>

          <h1 className="mt-3 text-5xl font-bold">{job.title}</h1>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-slate-800 px-4 py-2">
              📍 {job.location}
            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2">
              💼 {job.type}
            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2">
              Experience: {job.experience}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_280px]">
          <div>
            <h2 className="text-2xl font-bold">About the role</h2>

            <p className="mt-5 leading-8 text-slate-600">
              {job.description}
            </p>

            <h2 className="mt-12 text-2xl font-bold">Responsibilities</h2>

            <ul className="mt-5 space-y-3 text-slate-600">
              {job.responsibilities.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold">Requirements</h2>

            <ul className="mt-5 space-y-3 text-slate-600">
              {job.requirements.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold">Interested?</h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Submit your application and our recruitment team will review
              your profile.
            </p>

            <Link
              to={`/login?redirect=/careers/${job.id}`}
              className="mt-6 block rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Apply for this position
            </Link>

            <Link
              to="/careers"
              className="mt-3 block text-center text-sm font-semibold text-slate-700"
            >
              ← Back to Careers
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}