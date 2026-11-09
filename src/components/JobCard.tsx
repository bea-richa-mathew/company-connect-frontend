import { Link } from "react-router-dom";
import type { Job } from "../types";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-[#292d3a] dark:bg-[#14161e] dark:shadow-black/10 dark:hover:border-[#454b60] dark:hover:shadow-black/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
            {job.department}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-gray-100">
            {job.title}
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-[#252936] dark:text-gray-300">
          {job.type}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-gray-300">
        <p>📍 {job.location}</p>
        <p>💼 {job.experience}</p>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-gray-400">
        {job.description}
      </p>

      <Link
        to={`/careers/${job.id}`}
        className="mt-6 inline-flex font-semibold text-slate-900 group-hover:underline dark:text-indigo-300"
      >
        View Position →
      </Link>
    </article>
  );
}