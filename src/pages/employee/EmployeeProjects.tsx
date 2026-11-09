
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

import {
  useEmployeeProjectsQuery,
  useUpdateEmployeeProjectMutation,
  useUpdateProjectStatusMutation,
  useSubmitProjectCompletionMutation
} from "../../hooks/projectHooks";

import type {
  Project,
  ProjectStatus
} from "../../types/project";

import type {
  ProjectEditInput
} from "../../api/projectServices";

import api from "../../services/api";
import { openEmailDraft } from "../../utils/mailto";

type WorkStatus = Extract<
  ProjectStatus,
  "In Progress" | "On Hold" | "Completed"
>;

interface EditForm {
  title: string;
  category: string;
  description: string;
  summary: string;
  problem: string;
  solution: string;
  features: string;
  technologies: string;
  imageUrl: string;
  projectUrl: string;
}

interface EmailContact {
  name: string;
  email: string;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-[#08090d] dark:text-white";

const primaryButton =
  "rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50";

const secondaryButton =
  "rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800";

function getError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }

  return error instanceof Error
    ? error.message
    : "Something went wrong.";
}

function reviewOf(project: Project) {
  return project.reviewStatus || "Not Submitted";
}

function allowed(project: Project) {
  return (
    project.canEdit === true &&
    reviewOf(project) !== "Pending Review"
  );
}

function workStatus(project: Project): WorkStatus {
  if (project.status === "Completed") return "Completed";
  if (project.status === "On Hold") return "On Hold";
  return "In Progress";
}

function makeForm(project: Project): EditForm {
  return {
    title: project.title,
    category: project.category,
    description: project.description,
    summary: project.summary || "",
    problem: project.problem || "",
    solution: project.solution || "",
    features: (project.features || []).join("\n"),
    technologies: (project.technologies || []).join("\n"),
    imageUrl: project.imageUrl || "",
    projectUrl: project.projectUrl || ""
  };
}

export default function EmployeeProjects() {
  const projectsQuery = useEmployeeProjectsQuery();

  const updateProjectMutation =
    useUpdateEmployeeProjectMutation();

  const updateStatusMutation =
    useUpdateProjectStatusMutation();

  const completeMutation =
    useSubmitProjectCompletionMutation();

  const projects = projectsQuery.data ?? [];

  const busy =
    updateProjectMutation.isPending ||
    updateStatusMutation.isPending ||
    completeMutation.isPending;

  const [statuses, setStatuses] = useState<
    Record<string, WorkStatus>
  >({});

  const [selectedId, setSelectedId] = useState<string | null>(
    null
  );

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<EditForm | null>(null);

  // New: track the project whose email contact is loading.
  const [emailLoadingId, setEmailLoadingId] =
    useState<string | null>(null);

  const selected =
    projects.find((project) => project._id === selectedId) ||
    null;

  function closeDetails() {
    setSelectedId(null);
    setEditing(false);
    setForm(null);
  }

  async function refresh(showToast = true) {
    try {
      const result = await projectsQuery.refetch();

      if (result.isError) {
        throw result.error;
      }

      if (showToast) {
        toast.success("Projects refreshed.");
      }
    } catch (error) {
      toast.error(getError(error));
    }
  }

  function openDetails(project: Project) {
    setSelectedId(project._id);
    setEditing(false);
    setForm(null);
  }

  function startEditing(project: Project) {
    if (!allowed(project)) {
      toast.warning(
        "Editing is disabled or this project is pending review."
      );
      return;
    }

    setSelectedId(project._id);
    setForm(makeForm(project));
    setEditing(true);
  }

  function updateField(
    field: keyof EditForm,
    value: string
  ) {
    setForm((previous) =>
      previous
        ? { ...previous, [field]: value }
        : previous
    );
  }

  async function saveChanges() {
    if (!selected || !form || busy) return;

    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim()
    ) {
      toast.warning(
        "Title, category and description are required."
      );
      return;
    }

    const input: ProjectEditInput = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      summary: form.summary,
      problem: form.problem,
      solution: form.solution,
      features: form.features
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean),
      technologies: form.technologies
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean),
      imageUrl: form.imageUrl,
      projectUrl: form.projectUrl
    };

    try {
      await updateProjectMutation.mutateAsync({
        projectId: selected._id,
        input
      });

      setEditing(false);
      setForm(null);

      toast.success(
        "Draft saved. Admin can view the updated work."
      );
    } catch (error) {
      toast.error(getError(error));
    }
  }

  async function submitStatus(project: Project) {
    if (!allowed(project) || busy) return;

    const status =
      statuses[project._id] || workStatus(project);

    if (
      !window.confirm(
        status === "Completed"
          ? `Submit "${project.title}" for admin approval?`
          : `Change "${project.title}" to ${status}?`
      )
    ) {
      return;
    }

    try {
      if (status === "Completed") {
        await completeMutation.mutateAsync(project._id);

        toast.success(
          "Project submitted for admin review."
        );
      } else {
        await updateStatusMutation.mutateAsync({
          projectId: project._id,
          status
        });

        toast.success(`Project updated to ${status}.`);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  }

  // New: fetch the creator's email when Send Email is clicked.
  async function sendProjectEmail(project: Project) {
    if (emailLoadingId) return;

    setEmailLoadingId(project._id);

    try {
      const response = await api.get<{
        success: boolean;
        data: EmailContact | null;
      }>(
        `/projects/employee/${project._id}/email-contact`
      );

      const admin = response.data.data;

      if (!admin?.email) {
        toast.warning(
          "The project creator's email is not available."
        );
        return;
      }

      const subject =
        `Project Update - ${project.title}`;

      const body = [
        `Dear ${admin.name || "Admin"},`,
        "",
        `I am writing regarding the project "${project.title}".`,
        "",
        `Project: ${project.title}`,
        `Current Status: ${project.status}`,
        `Review Status: ${reviewOf(project)}`,
        "",
        "My update:",
        "",
        "",
        "Thank you."
      ].join("\n");

      openEmailDraft(
        admin.email,
        subject,
        body
      );
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setEmailLoadingId(null);
    }
  }

  return (
    <div className="space-y-7">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Edit projects, update progress and submit
            completed work for admin review.
          </p>
        </div>

        <button
          type="button"
          className={secondaryButton}
          disabled={projectsQuery.isFetching}
          onClick={() => void refresh()}
        >
          {projectsQuery.isFetching
            ? "Refreshing..."
            : "Refresh Projects"}
        </button>
      </div>

      {/* Loading */}
      {projectsQuery.isLoading && (
        <p>Loading projects...</p>
      )}

      {/* Fetch Error */}
      {projectsQuery.isError && (
        <div className="space-y-3">
          <p className="text-red-500">
            {getError(projectsQuery.error)}
          </p>

          <button
            type="button"
            className={secondaryButton}
            onClick={() => void refresh(false)}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!projectsQuery.isLoading &&
        !projectsQuery.isError &&
        projects.length === 0 && (
          <p className="rounded-2xl border border-gray-200 p-8 dark:border-gray-700">
            No projects available.
          </p>
        )}

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const canWork = allowed(project);
          const review = reviewOf(project);

          const status =
            statuses[project._id] || workStatus(project);

          return (
            <article
              key={project._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#14161e]"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="mb-5 h-44 w-full rounded-xl object-cover"
                />
              )}

              <p className="text-sm font-semibold text-indigo-500">
                {project.category}
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {project.title}
              </h2>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {project.description}
              </p>

              {/* Project Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                  {project.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    project.canEdit
                      ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                  }`}
                >
                  {project.canEdit
                    ? "Editing Allowed"
                    : "View Only"}
                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  {review}
                </span>

                {project.isPublished && (
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">
                    Public Version Published
                  </span>
                )}
              </div>

              {/* Admin Feedback */}
              {project.reviewComment && (
                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                  Admin feedback: {project.reviewComment}
                </p>
              )}

              {/* Status Selector */}
              <div className="mt-5">
                <label
                  htmlFor={`status-${project._id}`}
                  className="mb-2 block text-sm font-semibold"
                >
                  Update Project Status
                </label>

                <select
                  id={`status-${project._id}`}
                  value={status}
                  disabled={!canWork || busy}
                  onChange={(event) =>
                    setStatuses((previous) => ({
                      ...previous,
                      [project._id]:
                        event.target.value as WorkStatus
                    }))
                  }
                  className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="On Hold">
                    On Hold
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {review === "Pending Review" && (
                <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">
                  Waiting for admin approval.
                </p>
              )}

              {/* Card Actions */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openDetails(project)}
                  className={secondaryButton}
                >
                  View Details
                </button>

                {canWork && (
                  <>
                    <button
                      type="button"
                      onClick={() => startEditing(project)}
                      className={primaryButton}
                    >
                      Edit Project
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void submitStatus(project)
                      }
                      className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-500 disabled:opacity-50"
                    >
                      {busy
                        ? "Submitting..."
                        : status === "Completed"
                        ? "Submit Completion"
                        : "Submit Status"}
                    </button>
                  </>
                )}

                {/* New Send Email Button */}
                {project.isAssigned && (
                  <button
                    type="button"
                    disabled={emailLoadingId !== null}
                    onClick={() =>
                      void sendProjectEmail(project)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950"
                  >
                    <Mail size={16} />
                    {emailLoadingId === project._id
                      ? "Opening..."
                      : "Send Email"}
                  </button>
                )}
              </div>

              {!project.canEdit && (
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  The admin must enable Can edit for your
                  account before you can update this project.
                </p>
              )}
            </article>
          );
        })}
      </div>

      {/* Project Details / Editing Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 px-4 py-8">
          <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 text-gray-900 dark:bg-[#14161e] dark:text-white">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                {editing
                  ? "Edit Project"
                  : selected.title}
              </h2>

              <button
                type="button"
                aria-label="Close"
                onClick={closeDetails}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            {!editing ? (
              <div className="mt-6 space-y-5">
                {/* Status and Review */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
                    {selected.status}
                  </span>

                  <span className="rounded-lg bg-blue-100 px-3 py-2 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                    {reviewOf(selected)}
                  </span>
                </div>

                {/* Project Information */}
                {(
                  [
                    ["Description", selected.description],
                    ["Summary", selected.summary],
                    ["The Challenge", selected.problem],
                    ["The Solution", selected.solution]
                  ] as const
                ).map(([label, value]) => (
                  <section key={label}>
                    <h3 className="font-bold">
                      {label}
                    </h3>

                    <p className="mt-2 whitespace-pre-line text-sm text-gray-500 dark:text-gray-400">
                      {value || "Not provided."}
                    </p>
                  </section>
                ))}

                {/* Features */}
                <section>
                  <h3 className="font-bold">
                    Features
                  </h3>

                  <ul className="mt-2 list-inside list-disc text-sm text-gray-500 dark:text-gray-400">
                    {(selected.features || []).map(
                      (feature, index) => (
                        <li key={index}>
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </section>

                {/* Technologies */}
                <section>
                  <h3 className="font-bold">
                    Technologies
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {(selected.technologies || []).join(", ") ||
                      "Not provided."}
                  </p>
                </section>

                {/* Project Website */}
                {selected.projectUrl && (
                  <a
                    href={selected.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-indigo-500 underline"
                  >
                    Open Project Website
                  </a>
                )}

                {/* Admin Review Feedback */}
                {selected.reviewComment && (
                  <div className="rounded-xl border border-amber-300 p-4 dark:border-amber-700">
                    <h3 className="font-bold">
                      Admin Feedback
                    </h3>

                    <p className="mt-2 text-sm">
                      {selected.reviewComment}
                    </p>
                  </div>
                )}

                {/* Detail Actions */}
                <div className="flex flex-wrap gap-3">
                  {allowed(selected) && (
                    <button
                      type="button"
                      className={primaryButton}
                      onClick={() =>
                        startEditing(selected)
                      }
                    >
                      Edit Project
                    </button>
                  )}

                  {selected.isAssigned && (
                    <button
                      type="button"
                      className={secondaryButton}
                      disabled={emailLoadingId !== null}
                      onClick={() =>
                        void sendProjectEmail(selected)
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        <Mail size={16} />
                        Send Email
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    className={secondaryButton}
                    onClick={() => void refresh()}
                  >
                    Refresh Permissions
                  </button>
                </div>
              </div>
            ) : form ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void saveChanges();
                }}
                className="mt-6 space-y-4"
              >
                {(
                  [
                    ["title", "Project Title"],
                    ["category", "Category"],
                    ["description", "Short Description"],
                    ["summary", "Summary"],
                    ["problem", "The Challenge"],
                    ["solution", "The Solution"],
                    ["features", "Features (one per line)"],
                    [
                      "technologies",
                      "Technologies (one per line)"
                    ],
                    ["imageUrl", "Image URL"],
                    ["projectUrl", "Project URL"]
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="block"
                  >
                    <span className="mb-2 block text-sm font-medium">
                      {label}
                    </span>

                    {(
                      [
                        "description",
                        "summary",
                        "problem",
                        "solution",
                        "features",
                        "technologies"
                      ] as string[]
                    ).includes(key) ? (
                      <textarea
                        rows={4}
                        value={form[key]}
                        onChange={(event) =>
                          updateField(
                            key,
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    ) : (
                      <input
                        value={form[key]}
                        onChange={(event) =>
                          updateField(
                            key,
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    )}
                  </label>
                ))}

                {/* Publication Notice */}
                <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  Changes to published projects are saved
                  as a new draft. The public version stays
                  unchanged until admin approval and
                  republication.
                </p>

                {/* Form Actions */}
                <div className="flex flex-wrap justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className={secondaryButton}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={busy}
                    className={primaryButton}
                  >
                    {busy
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
