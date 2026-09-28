import { Link } from "react-router-dom";
import type { Job } from "../types";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {job.department}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {job.title}
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {job.type}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <p>📍 {job.location}</p>
        <p>💼 {job.experience}</p>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {job.description}
      </p>

      <Link
        to={`/careers/${job.id}`}
        className="mt-6 inline-flex font-semibold text-slate-900 group-hover:underline"
      >
        View Position →
      </Link>
    </article>
  );
}