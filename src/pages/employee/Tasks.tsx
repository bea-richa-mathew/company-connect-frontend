
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import {
  AlertCircle,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Loader2,
  Paperclip,
  Send,
  Upload,
  CheckCircle2,
  Mail,
} from "lucide-react";

import { useTasksQuery } from "../../hooks/queryHooks";
import { useTaskStatusMutation } from "../../hooks/mutationHooks";
import api from "../../services/api";
import { openEmailDraft } from "../../utils/mailto";
import type { Task } from "../../types";

type ReviewStatus =
  | "Not Submitted"
  | "Pending Review"
  | "Approved"
  | "Changes Requested";

type TaskWithReview = Task & {
  reviewStatus?: ReviewStatus;
  reviewComment?: string;
};

interface TaskAttachment {
  _id: string;
  originalName: string;
  size: number;
  createdAt: string;
}

interface Submission {
  _id: string;
  note: string;
  status: ReviewStatus;
  reviewComment?: string;
  createdAt: string;
  file?: {
    originalName?: string;
    size?: number;
  };
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Request failed"
    );
  }

  return error instanceof Error
    ? error.message
    : "Something went wrong";
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`;
}

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

function EmployeeTaskAttachments({
  taskId,
}: {
  taskId: string;
}) {
  const [downloadingId, setDownloadingId] =
    useState<string | null>(null);

  const [downloadError, setDownloadError] =
    useState("");

  const attachmentsQuery = useQuery({
    queryKey: ["task-attachments", taskId],
    enabled: Boolean(taskId),

    queryFn: async () => {
      const response = await api.get<{
        success: boolean;
        data: TaskAttachment[];
      }>(`/tasks/${taskId}/attachments`);

      return response.data.data;
    },
  });

  async function downloadAttachment(
    attachment: TaskAttachment
  ) {
    setDownloadError("");
    setDownloadingId(attachment._id);

    let objectUrl: string | null = null;

    try {
      const response = await api.get(
        `/tasks/${taskId}/attachments/${attachment._id}/download`,
        { responseType: "blob" }
      );

      objectUrl = URL.createObjectURL(
        response.data as Blob
      );

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = attachment.originalName;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setDownloadError(getErrorMessage(error));
    } finally {
      if (objectUrl) {
        const url = objectUrl;

        window.setTimeout(
          () => URL.revokeObjectURL(url),
          1000
        );
      }

      setDownloadingId(null);
    }
  }

  return (
    <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
      <h4 className="flex items-center gap-2 text-sm font-bold">
        <Paperclip size={16} />
        Task Attachments
      </h4>

      {attachmentsQuery.isLoading && (
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={15} className="animate-spin" />
          Loading files...
        </p>
      )}

      {attachmentsQuery.isError && (
        <div className="space-y-2">
          <p className="text-sm text-red-500">
            {getErrorMessage(attachmentsQuery.error)}
          </p>

          <button
            type="button"
            onClick={() =>
              void attachmentsQuery.refetch()
            }
            className="text-xs font-semibold text-indigo-600"
          >
            Try Again
          </button>
        </div>
      )}

      {!attachmentsQuery.isLoading &&
        !attachmentsQuery.isError &&
        !attachmentsQuery.data?.length && (
          <p className="text-sm text-slate-500">
            No files attached to this task.
          </p>
        )}

      {attachmentsQuery.data?.map((attachment) => (
        <div
          key={attachment._id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex min-w-0 items-center gap-2">
            <FileText
              size={18}
              className="shrink-0 text-indigo-600"
            />

            <div className="min-w-0">
              <p className="break-all text-xs font-semibold">
                {attachment.originalName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {formatSize(attachment.size)}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={
              downloadingId === attachment._id
            }
            onClick={() =>
              void downloadAttachment(attachment)
            }
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            <Download size={15} />
            Download
          </button>
        </div>
      ))}

      {downloadError && (
        <p role="alert" className="text-sm text-red-500">
          {downloadError}
        </p>
      )}
    </div>
  );
}

export default function Tasks() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useTasksQuery();

  const statusMutation = useTaskStatusMutation();

  const [expandedTaskId, setExpandedTaskId] =
    useState<string | null>(null);

  const [submissionTaskId, setSubmissionTaskId] =
    useState<string | null>(null);

  const [submissionNote, setSubmissionNote] =
    useState("");

  const [submissionFile, setSubmissionFile] =
    useState<File | null>(null);

  const [downloadSubmissionId, setDownloadSubmissionId] =
    useState<string | null>(null);

  const submissionQuery = useQuery({
    queryKey: [
      "task-submissions",
      submissionTaskId,
    ],
    enabled: Boolean(submissionTaskId),
    refetchInterval: 10000,

    queryFn: async () => {
      const response = await api.get<{
        success: boolean;
        data: Submission[];
      }>(
        `/tasks/${submissionTaskId}/submissions`
      );

      return response.data.data;
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!submissionTaskId) {
        throw new Error("Select a task");
      }

      const form = new FormData();

      form.append("note", submissionNote.trim());

      if (submissionFile) {
        form.append("file", submissionFile);
      }

      const response = await api.post(
        `/tasks/${submissionTaskId}/submissions`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },

    onSuccess: async () => {
      toast.success(
        "Work submitted for admin approval"
      );

      setSubmissionNote("");
      setSubmissionFile(null);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["my-tasks"],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            "task-submissions",
            submissionTaskId,
          ],
        }),
      ]);
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });

  async function downloadEvidence(
    submission: Submission
  ) {
    if (!submissionTaskId) return;

    setDownloadSubmissionId(submission._id);

    let objectUrl: string | null = null;

    try {
      const response = await api.get(
        `/tasks/${submissionTaskId}/submissions/${submission._id}/download`,
        { responseType: "blob" }
      );

      objectUrl = URL.createObjectURL(
        response.data as Blob
      );

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download =
        submission.file?.originalName ||
        "submission";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      if (objectUrl) {
        const url = objectUrl;

        window.setTimeout(
          () => URL.revokeObjectURL(url),
          1000
        );
      }

      setDownloadSubmissionId(null);
    }
  }

  function toggleSubmission(taskId: string) {
    setSubmissionTaskId(
      submissionTaskId === taskId
        ? null
        : taskId
    );

    setSubmissionNote("");
    setSubmissionFile(null);
  }

  // New: open a manual email draft for the assigning admin.
  function sendTaskEmail(task: TaskWithReview) {
    const assignedBy = task.assignedBy;

    const admin =
      assignedBy &&
      typeof assignedBy === "object"
        ? assignedBy
        : null;

    if (!admin?.email) {
      toast.warning(
        "The assigning admin's email is not available."
      );
      return;
    }

    const dueDate = task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "Not specified";

    const subject = `Task Update - ${task.title}`;

    const body = [
      `Dear ${admin.name || "Admin"},`,
      "",
      `I am writing regarding the task "${task.title}".`,
      "",
      `Task: ${task.title}`,
      `Priority: ${task.priority}`,
      `Due Date: ${dueDate}`,
      `Current Status: ${task.status}`,
      `Review Status: ${
        task.reviewStatus || "Not Submitted"
      }`,
      "",
      "My update:",
      "",
      "",
      "Thank you.",
    ].join("\n");

    openEmailDraft(
      admin.email,
      subject,
      body
    );
  }

  return (
    <div className="text-slate-900 transition-colors dark:text-slate-100">
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-indigo-700 dark:text-indigo-400">
          MY TASKS
        </p>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Assigned tasks
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          View assigned work, update progress,
          download attachments and submit work
          for admin approval.
        </p>
      </div>

      {isLoading && (
        <p className="text-slate-500">
          Loading tasks...
        </p>
      )}

      {isError && (
        <p className="mb-4 flex items-center gap-2 text-red-500">
          <AlertCircle size={17} />
          {getErrorMessage(error)}
        </p>
      )}

      {statusMutation.isError && (
        <p className="mb-4 text-sm text-red-500">
          {getErrorMessage(statusMutation.error)}
        </p>
      )}

      {!isLoading && !isError && (
        <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((item) => {
            const task = item as TaskWithReview;
            const taskId = task._id || task.id;

            const reviewStatus =
              task.reviewStatus || "Not Submitted";

            const isExpanded =
              expandedTaskId === taskId;

            const isSubmissionOpen =
              submissionTaskId === taskId;

            const assignedBy = task.assignedBy;
            const adminEmail =
              assignedBy &&
              typeof assignedBy === "object"
                ? assignedBy.email
                : undefined;

            return (
              <article
                key={taskId}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {task.priority} priority
                </span>

                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {task.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {task.description}
                </p>

                <p className="mt-4 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CalendarDays
                    size={16}
                    className="text-indigo-600"
                  />

                  <strong>Due:</strong>

                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "Not specified"}
                </p>

                <label className="mt-4 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Task status

                  <select
                    value={task.status}
                    disabled={
                      statusMutation.isPending ||
                      task.status === "Completed" ||
                      reviewStatus === "Pending Review"
                    }
                    onChange={(event) => {
                      if (!taskId) return;

                      statusMutation.mutate({
                        id: taskId,
                        status: event.target
                          .value as Task["status"],
                      });
                    }}
                    className={`${fieldClass} mt-2`}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    {task.status === "Completed" && (
                      <option value="Completed">
                        Completed
                      </option>
                    )}
                  </select>
                </label>

                {/* New Send Email Button */}
                <button
                  type="button"
                  disabled={!adminEmail}
                  title={
                    adminEmail
                      ? `Send email to ${adminEmail}`
                      : "Assigning admin email unavailable"
                  }
                  onClick={() => sendTaskEmail(task)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-300 bg-white px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-700 dark:bg-slate-800 dark:text-indigo-300 dark:hover:bg-slate-700"
                >
                  <Mail size={17} />
                  Send Email
                </button>

                <button
                  type="button"
                  disabled={!taskId}
                  onClick={() =>
                    setExpandedTaskId(
                      isExpanded
                        ? null
                        : taskId || null
                    )
                  }
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"
                >
                  <span className="flex items-center gap-2">
                    <Paperclip size={17} />
                    {isExpanded
                      ? "Hide Attachments"
                      : "View Files"}
                  </span>

                  {isExpanded
                    ? <ChevronUp size={17} />
                    : <ChevronDown size={17} />}
                </button>

                {isExpanded && taskId && (
                  <EmployeeTaskAttachments
                    taskId={taskId}
                  />
                )}

                {/* Inline task submission */}
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Review: {reviewStatus}
                  </p>

                  <button
                    type="button"
                    disabled={!taskId}
                    onClick={() => {
                      if (taskId) {
                        toggleSubmission(taskId);
                      }
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Send size={16} />

                    {isSubmissionOpen
                      ? "Hide Submission"
                      : "Submit / View Work"}
                  </button>

                  {isSubmissionOpen && taskId && (
                    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                      {submissionQuery.isLoading && (
                        <p className="text-sm text-slate-500">
                          Loading submissions...
                        </p>
                      )}

                      {submissionQuery.isError && (
                        <p className="text-sm text-red-500">
                          {getErrorMessage(
                            submissionQuery.error
                          )}
                        </p>
                      )}

                      {reviewStatus === "Pending Review" && (
                        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                          Submitted. Waiting for admin approval.
                        </p>
                      )}

                      {task.status === "Completed" && (
                        <p className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-300">
                          <CheckCircle2 size={16} />
                          Task completed.
                        </p>
                      )}

                      {reviewStatus === "Changes Requested" && (
                        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                          Changes requested. Review the
                          feedback below and resubmit.
                        </p>
                      )}

                      {task.status !== "Completed" &&
                        reviewStatus !== "Pending Review" && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold">
                              Submit Completed Work
                            </h4>

                            <textarea
                              rows={4}
                              maxLength={10000}
                              value={submissionNote}
                              onChange={(event) =>
                                setSubmissionNote(
                                  event.target.value
                                )
                              }
                              placeholder="Describe the work you completed..."
                              className={fieldClass}
                            />

                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                              <Upload size={16} />
                              Supporting file (optional, max 5 MB)
                            </label>

                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg,.txt,.docx,.xlsx"
                              onChange={(event) =>
                                setSubmissionFile(
                                  event.target.files?.[0] ||
                                  null
                                )
                              }
                              className={fieldClass}
                            />

                            {submissionFile && (
                              <p className="break-all text-xs text-slate-500">
                                {submissionFile.name}
                              </p>
                            )}

                            <button
                              type="button"
                              disabled={
                                submitMutation.isPending ||
                                (
                                  !submissionNote.trim() &&
                                  !submissionFile
                                )
                              }
                              onClick={() =>
                                submitMutation.mutate()
                              }
                              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                            >
                              <Send size={16} />

                              {submitMutation.isPending
                                ? "Submitting..."
                                : "Submit for Approval"}
                            </button>
                          </div>
                        )}

                      <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                        <h4 className="text-sm font-bold">
                          Submission History
                        </h4>

                        {!submissionQuery.isLoading &&
                          !submissionQuery.data?.length && (
                            <p className="text-xs text-slate-500">
                              No submissions yet.
                            </p>
                          )}

                        {(submissionQuery.data ?? []).map(
                          (submission) => (
                            <div
                              key={submission._id}
                              className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
                            >
                              <div className="flex flex-wrap justify-between gap-2">
                                <strong className="text-xs">
                                  {submission.status}
                                </strong>

                                <span className="text-xs text-slate-500">
                                  {new Date(
                                    submission.createdAt
                                  ).toLocaleString()}
                                </span>
                              </div>

                              {submission.note && (
                                <p className="whitespace-pre-wrap text-sm">
                                  {submission.note}
                                </p>
                              )}

                              {submission.file?.originalName && (
                                <button
                                  type="button"
                                  disabled={
                                    downloadSubmissionId ===
                                    submission._id
                                  }
                                  onClick={() =>
                                    void downloadEvidence(
                                      submission
                                    )
                                  }
                                  className="inline-flex items-center gap-2 break-all text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                                >
                                  <Download size={15} />
                                  {submission.file.originalName}
                                </button>
                              )}

                              {submission.reviewComment && (
                                <p className="rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
                                  <strong>
                                    Admin feedback:
                                  </strong>{" "}
                                  {submission.reviewComment}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {!tasks.length && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-7 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              No tasks assigned.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
