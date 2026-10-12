import {
  useQuery
} from "@tanstack/react-query";

import {
  Link
} from "react-router-dom";

import {
  useState
} from "react";

import api from "../../services/api";
import type { Job } from "../../types";

export default function Careers() {
  const [
    search,
    setSearch
  ] = useState("");

  const {
    data = [],
    isLoading,
    error
  } = useQuery<Job[]>({
    queryKey: ["jobs"],

    queryFn: async () => {
      const response =
        await api.get("/jobs");

      return response.data.data || [];
    }
  });

  const filtered =
    data.filter((job) =>
      `${job.title} ${job.department} ${job.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <section className="mx-auto max-w-7xl px-8 py-20">
      <div className="mb-8">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          CAREERS
        </p>

        <h1 className="text-4xl font-extrabold">
          Find your next opportunity
        </h1>

        <p className="text-[#6d7890]">
          Join a team where you can learn,
          contribute, and grow.
        </p>
      </div>

      <input
        className="mb-6 w-full max-w-xl rounded-lg border border-[#d7deea] bg-white px-3 py-3 outline-none focus:border-[#3155d9]"
        placeholder="Search by title, department, or location..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      {isLoading && (
        <p>Loading jobs...</p>
      )}

      {error && (
        <p className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]">
          Unable to load jobs.
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-4">
          {filtered.map((job) => {
            const id =
              job._id || job.id;

            return (
              <article
                className="flex flex-col justify-between gap-5 rounded-[14px] border border-[#e2e7f0] bg-white p-6 md:flex-row md:items-center"
                key={id}
              >
                <div>
                  <h3>{job.title}</h3>

                  <p className="text-[#6d7890]">
                    {job.department} ·{" "}
                    {job.location}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#3155d9]">
                      {job.type}
                    </span>

                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#3155d9]">
                      {job.experience}
                    </span>
                  </div>
                </div>

                <Link
                  className="rounded-lg bg-[#3155d9] px-4 py-2 text-center text-sm font-semibold text-white"
                  to={`/careers/${id}`}
                >
                  View Details
                </Link>
              </article>
            );
          })}

          {!filtered.length && (
            <div className="rounded-xl border border-dashed border-[#e2e7f0] bg-white p-9 text-center text-[#6d7890]">
              No jobs found.
            </div>
          )}
        </div>
      )}
    </section>
  );
}