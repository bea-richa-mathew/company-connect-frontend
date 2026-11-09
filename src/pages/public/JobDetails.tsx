
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Building2,
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
  UserRound,
  Mail,
  Phone,
  Link2,
  Send,
  X,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import api from "../../services/api";
import type { Job } from "../../types";

// ==========================================
// TYPES
// ==========================================

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
}

// ==========================================
// DEFAULT FORM
// ==========================================

const initialForm: ApplicationForm = {
  name: "",
  email: "",
  phone: "",
  resumeUrl: "",
  coverLetter: "",
};

// ==========================================
// STYLES
// ==========================================

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200";

// ==========================================
// HELPERS
// ==========================================

function formatDeadline(value?: string) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    if (response?.data?.message) {
      return response.data.message;
    }
  }

  return error instanceof Error
    ? error.message
    : "Unable to submit application.";
}

// ==========================================
// COMPONENT
// ==========================================

export default function JobDetails() {
  const { id } = useParams();

  // ========================================
  // STATES
  // ========================================

  const [showApplication, setShowApplication] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState<ApplicationForm>({
      ...initialForm,
    });

  // ========================================
  // FETCH JOB DETAILS
  // ========================================

  const {
    data: job,
    isLoading,
    isError,
    refetch,
  } = useQuery<Job>({
    queryKey: ["job", id],

    queryFn: async () => {
      const response = await api.get(
        `/jobs/${id}`
      );

      return response.data.data;
    },

    enabled: !!id,
  });

  // ========================================
  // MODAL BODY SCROLL
  // ========================================

  useEffect(() => {
    if (!showApplication) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [showApplication]);

  // ========================================
  // ESCAPE KEY TO CLOSE MODAL
  // ========================================

  useEffect(() => {
    if (!showApplication) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !submitting) {
        setShowApplication(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [showApplication, submitting]);

  // ========================================
  // FORM HANDLERS
  // ========================================

  function updateField(
    field: keyof ApplicationForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function openApplication() {
    setError("");
    setShowApplication(true);
  }

  function closeApplication() {
    if (submitting) {
      return;
    }

    setShowApplication(false);
    setError("");
  }

  // ========================================
  // SUBMIT APPLICATION
  // ========================================

  async function submit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!job || submitting || submitted) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await api.post("/applications", {
        job: job._id || job.id,
        applicantName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        resumeUrl: form.resumeUrl.trim(),
        coverLetter: form.coverLetter.trim(),
      });

      setSubmitted(true);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================
  // LOADING STATE
  // ========================================

  if (isLoading) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
        <div className="text-center">
          <Loader2
            size={38}
            className="mx-auto animate-spin text-indigo-600 dark:text-indigo-400"
          />

          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
            Loading job details...
          </p>
        </div>
      </section>
    );
  }

  // ========================================
  // ERROR / NOT FOUND STATE
  // ========================================

  if (isError || !job) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">
            Unable to load this job
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            This position may no longer be available,
            or the job details could not be loaded.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-white"
            >
              Try Again
            </button>

            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <ArrowLeft size={16} />
              Back to Careers
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ========================================
  // MAIN PAGE
  // ========================================

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* BACK BUTTON */}

        <Link
          to="/careers"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={17} />
          Back to Careers
        </Link>

        {/* ==================================
            JOB HEADER
        ================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-500/10" />

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <BriefcaseBusiness size={15} />
              We're Hiring
            </div>

            <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              {job.title}
            </h1>

            <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              Pinnacle Smart Technologies
            </p>

            {/* JOB TAGS */}

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <Building2
                  size={17}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                {job.department}
              </span>

              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <MapPin
                  size={17}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                {job.location}
              </span>

              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <BriefcaseBusiness
                  size={17}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                {job.type}
              </span>
            </div>

            {/* APPLY BUTTON */}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-7 dark:border-slate-800">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Interested in joining our team?
              </p>

              <button
                type="button"
                onClick={openApplication}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Apply Now
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ==================================
            JOB INFORMATION
        ================================== */}

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">

          {/* LEFT SIDE */}

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">

            {/* JOB DESCRIPTION */}

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  Job Description
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  About this opportunity
                </p>
              </div>
            </div>

            <p className="whitespace-pre-line text-sm leading-8 text-slate-700 dark:text-slate-300">
              {job.description}
            </p>

            {/* DIVIDER */}

            <div className="my-8 border-t border-slate-200 dark:border-slate-800" />

            {/* REQUIRED SKILLS */}

            <h2 className="mb-5 text-xl font-bold text-slate-950 dark:text-white">
              Required Skills
            </h2>

            {job.skills?.length ? (
              <div className="space-y-4">
                {job.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                    />

                    <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Required skills have not been specified.
              </p>
            )}
          </article>

          {/* RIGHT SIDE */}

          <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 text-xl font-bold text-slate-950 dark:text-white">
              Position Overview
            </h2>

            {[
              {
                icon: BriefcaseBusiness,
                label: "Employment Type",
                value: job.type,
              },
              {
                icon: Clock3,
                label: "Experience",
                value:
                  job.experience || "Not specified",
              },
              {
                icon: Building2,
                label: "Department",
                value: job.department,
              },
              {
                icon: MapPin,
                label: "Location",
                value: job.location,
              },
              {
                icon: CalendarDays,
                label: "Application Deadline",
                value: formatDeadline(
                  job.deadline
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-4 border-b border-slate-100 py-4 last:border-0 dark:border-slate-800"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <item.icon size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* SECOND APPLY BUTTON */}

            <button
              type="button"
              onClick={openApplication}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Apply for this Position
              <ArrowRight size={17} />
            </button>
          </aside>
        </div>
      </div>

      {/* ======================================
          APPLICATION POPUP / MODAL
      ====================================== */}

      {showApplication && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeApplication();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-linear-to-r from-indigo-50 via-white to-violet-50 px-6 py-5 dark:border-slate-800 dark:from-indigo-500/10 dark:via-slate-900 dark:to-violet-500/10 sm:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <Send size={21} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    Job Application
                  </p>

                  <h2
                    id="application-modal-title"
                    className="mt-1 text-xl font-extrabold text-slate-950 dark:text-white sm:text-2xl"
                  >
                    Apply for {job.title}
                  </h2>

                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {job.department} · {job.location}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeApplication}
                disabled={submitting}
                aria-label="Close application form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* SCROLLABLE MODAL CONTENT */}

            <div className="overflow-y-auto">

              {/* SUCCESS MESSAGE */}

              {submitted ? (
                <div
                  role="status"
                  className="px-7 py-14 text-center sm:px-10"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 size={42} />
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold text-slate-950 dark:text-white">
                    Application Submitted!
                  </h3>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
                    Thank you, {form.name}.
                    Your application for{" "}
                    <strong>{job.title}</strong>{" "}
                    has been submitted successfully.
                  </p>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    Our recruitment team will review
                    your application.
                  </p>

                  <button
                    type="button"
                    onClick={closeApplication}
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-bold text-white hover:bg-indigo-700"
                  >
                    Done
                    <CheckCircle2 size={17} />
                  </button>
                </div>
              ) : (

                /* APPLICATION FORM */

                <form
                  onSubmit={submit}
                  className="space-y-6 p-6 sm:p-8"
                >
                  {/* PERSONAL INFORMATION */}

                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Personal Information
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Enter your contact details below.
                    </p>
                  </div>

                  {/* FULL NAME */}

                  <div>
                    <label
                      htmlFor="job-applicant-name"
                      className={labelClass}
                    >
                      <UserRound
                        size={16}
                        className="text-indigo-600 dark:text-indigo-400"
                      />

                      Full Name

                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      id="job-applicant-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  {/* EMAIL AND PHONE */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="job-applicant-email"
                        className={labelClass}
                      >
                        <Mail
                          size={16}
                          className="text-indigo-600 dark:text-indigo-400"
                        />

                        Email Address

                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        id="job-applicant-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value
                          )
                        }
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="job-applicant-phone"
                        className={labelClass}
                      >
                        <Phone
                          size={16}
                          className="text-indigo-600 dark:text-indigo-400"
                        />

                        Phone Number

                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        id="job-applicant-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateField(
                            "phone",
                            event.target.value
                          )
                        }
                        placeholder="Phone number"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* DIVIDER */}

                  <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Application Documents
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Share your resume and tell us
                      about yourself.
                    </p>
                  </div>

                  {/* RESUME URL */}

                  <div>
                    <label
                      htmlFor="job-applicant-resume"
                      className={labelClass}
                    >
                      <Link2
                        size={16}
                        className="text-indigo-600 dark:text-indigo-400"
                      />

                      Resume URL

                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      id="job-applicant-resume"
                      type="url"
                      required
                      value={form.resumeUrl}
                      onChange={(event) =>
                        updateField(
                          "resumeUrl",
                          event.target.value
                        )
                      }
                      placeholder="https://drive.google.com/..."
                      className={inputClass}
                    />

                    <div className="mt-3 flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50 p-3 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                      <ShieldCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                      />

                      <p className="text-xs leading-5 text-indigo-800 dark:text-indigo-300">
                        Paste a shareable link to your
                        resume from Google Drive or
                        another file-sharing service.
                        Make sure viewing access is
                        enabled.
                      </p>
                    </div>
                  </div>

                  {/* COVER LETTER */}

                  <div>
                    <label
                      htmlFor="job-applicant-cover"
                      className={labelClass}
                    >
                      <FileText
                        size={16}
                        className="text-indigo-600 dark:text-indigo-400"
                      />

                      Cover Letter

                      <span className="ml-auto text-xs font-normal text-slate-500 dark:text-slate-400">
                        Optional
                      </span>
                    </label>

                    <textarea
                      id="job-applicant-cover"
                      rows={5}
                      value={form.coverLetter}
                      onChange={(event) =>
                        updateField(
                          "coverLetter",
                          event.target.value
                        )
                      }
                      placeholder="Tell us why you're interested in this role..."
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  {/* ERROR MESSAGE */}

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                    >
                      <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0"
                      />

                      <p>{error}</p>
                    </div>
                  )}

                  {/* FORM ACTIONS */}

                  <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
                    <button
                      type="button"
                      onClick={closeApplication}
                      disabled={submitting}
                      className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />

                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} />

                          Submit Application

                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Your application details will be
                    shared with the Pinnacle Smart
                    Technologies recruitment team.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
