import {
  useState,
  type FormEvent
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import {
  useQuery
} from "@tanstack/react-query";

import api from "../../services/api";
import type { Job } from "../../types";

export default function JobDetails() {
  const { id } =
    useParams();

  const [
    submitted,
    setSubmitted
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  const [
    form,
    setForm
  ] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: ""
  });

  const {
    data: job,
    isLoading
  } = useQuery<Job>({
    queryKey: ["job", id],

    queryFn: async () => {
      const response =
        await api.get(`/jobs/${id}`);

      return response.data.data;
    },

    enabled: !!id
  });

  if (isLoading) {
    return (
      <section className="px-[8%] py-20">
        Loading...
      </section>
    );
  }

  if (!job) {
    return (
      <section className="px-[8%] py-20">
        <h1>Job not found</h1>

        <Link
          className="text-[#3155d9]"
          to="/careers"
        >
          Back to careers
        </Link>
      </section>
    );
  }

  const submit = async (event: FormEvent) => {
  event.preventDefault();
  setError("");

  try {
    await api.post("/applications", {
      job: job._id || job.id,
      applicantName: form.name,
      email: form.email,
      phone: form.phone,
      resumeUrl: form.resumeUrl,
      coverLetter: form.coverLetter,
    });

    setSubmitted(true);
  } catch (err: unknown) {
    const responseMessage =
      typeof err === "object" &&
      err !== null &&
      "response" in err
        ? (
            err as {
              response?: {
                data?: { message?: string };
              };
            }
          ).response?.data?.message
        : undefined;

    setError(
      responseMessage ||
      (err instanceof Error
        ? err.message
        : "Unable to submit application.")
    );
  }
};

  return (
    <section className="mx-auto max-w-7xl px-8 py-20">
      <Link
        className="mb-5 inline-block text-[#3155d9]"
        to="/careers"
      >
        ← Back to Careers
      </Link>

      <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
            JOB OPENING
          </p>

          <h1 className="text-4xl font-extrabold">
            {job.title}
          </h1>

          <p className="text-[#6d7890]">
            {job.department} ·{" "}
            {job.location}
          </p>
        </div>

        <span className="w-fit rounded-full bg-[#eef2ff] px-3 py-1 text-sm font-semibold text-[#3155d9]">
          {job.type}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="rounded-[14px] border border-[#e2e7f0] bg-white p-7 shadow-sm">
          <h2>Job Description</h2>

          <p className="text-[#6d7890]">
            {job.description}
          </p>

          <h2>Required Skills</h2>

          <ul className="list-disc space-y-2 pl-5">
            {job.skills.map(
              (skill) => (
                <li key={skill}>
                  {skill}
                </li>
              )
            )}
          </ul>

          <h2>Experience</h2>

          <p className="text-[#6d7890]">
            {job.experience}
          </p>

          <h2>Application Deadline</h2>

          <p className="text-[#6d7890]">
            {job.deadline || "Not specified"}
          </p>
        </article>

        <form
          className="grid gap-4 rounded-[14px] border border-[#e2e7f0] bg-white p-7 shadow-sm"
          onSubmit={submit}
        >
          <h2>Apply Now</h2>

          {submitted ? (
            <div className="rounded-lg bg-[#e7f8ef] p-3 text-[#167044]">
              Your application has been
              submitted successfully.
            </div>
          ) : (
            <>
              <label>
                Full Name

                <input
                  className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value
                    })
                  }
                />
              </label>

              <label>
                Email

                <input
                  className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value
                    })
                  }
                />
              </label>

              <label>
                Phone

                <input
                  className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value
                    })
                  }
                />
              </label>

              <label>
                Resume URL

                <input
                  className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
                  required
                  value={form.resumeUrl}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      resumeUrl: event.target.value
                    })
                  }
                />
              </label>

              <label>
                Cover Letter

                <textarea
                  className="mt-1 w-full resize-y rounded-lg border border-[#d7deea] px-3 py-3"
                  rows={4}
                  value={form.coverLetter}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      coverLetter:
                        event.target.value
                    })
                  }
                />
              </label>

              {error && (
                <p className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]">
                  {error}
                </p>
              )}

              <button
                className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white"
                type="submit"
              >
                Submit Application
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}