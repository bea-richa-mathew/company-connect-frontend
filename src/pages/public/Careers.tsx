import { useMemo, useState } from "react";
import JobCard from "../../components/JobCard";
import { mockJobs } from "../../data/mockData";

export default function Careers() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const departments = [
    "All",
    ...Array.from(new Set(mockJobs.map((job) => job.department))),
  ];

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" || job.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  return (
    <div>
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Careers
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold">
            Build your career with us.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Join a team where you can learn, contribute and work on meaningful
            technology.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-[1fr_240px]">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
          />

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none"
          >
            {departments.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-10">
          <p className="text-sm text-slate-500">
            {filteredJobs.length} position
            {filteredJobs.length !== 1 ? "s" : ""} available
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <h3 className="font-bold">No jobs found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search or department.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}