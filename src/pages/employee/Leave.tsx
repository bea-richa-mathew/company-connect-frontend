
import {
  useState,
  type FormEvent,
} from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

import api from "../../services/api";
import { openEmailDraft } from "../../utils/mailto";

import type {
  LeaveRequest,
} from "../../types";

interface AdminContact {
  name: string;
  email: string;
}

interface LeaveApiResponse {
  success: boolean;
  data: LeaveRequest[];
  adminContact?: AdminContact | null;
}

interface LeaveQueryData {
  requests: LeaveRequest[];
  adminContact: AdminContact | null;
}

export default function Leave() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [dateError, setDateError] = useState("");

  // Get today's date in local time.
  const getLocalDateString = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getLocalDateString();

  // Fetch leave requests and admin email.
  const {
    data: leaveData,
    isLoading,
    isError,
    error,
  } = useQuery<LeaveQueryData>({
    queryKey: ["my-leaves"],

    queryFn: async () => {
      const response =
        await api.get<LeaveApiResponse>(
          "/leaves"
        );

      return {
        requests: response.data.data || [],
        adminContact:
          response.data.adminContact || null,
      };
    },

    // Refresh to show admin decisions automatically.
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  const requests = leaveData?.requests ?? [];
  const adminContact =
    leaveData?.adminContact ?? null;

  // Submit a leave request.
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/leaves", {
        leaveType: form.leaveType,
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason,
      });

      return response.data;
    },

    onSuccess: async () => {
      toast.success(
        "Leave request submitted successfully!"
      );

      setForm({
        leaveType: "Casual",
        startDate: "",
        endDate: "",
        reason: "",
      });

      setDateError("");

      await queryClient.invalidateQueries({
        queryKey: ["my-leaves"],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit leave request."
      );
    },
  });

  // Validate the form before submitting.
  const submit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setDateError("");

    const currentDate =
      getLocalDateString();

    if (!form.startDate || !form.endDate) {
      const message =
        "Please select both leave dates.";

      setDateError(message);
      toast.warning(message);
      return;
    }

    if (
      form.startDate < currentDate ||
      form.endDate < currentDate
    ) {
      const message =
        "Past dates are not allowed. Please select today or a future date.";

      setDateError(message);
      toast.warning(message);
      return;
    }

    if (form.endDate < form.startDate) {
      const message =
        "The end date cannot be earlier than the start date.";

      setDateError(message);
      toast.warning(message);
      return;
    }

    if (!form.reason.trim()) {
      const message =
        "Please provide a reason for your leave.";

      setDateError(message);
      toast.warning(message);
      return;
    }

    mutation.mutate();
  };

  // Prepare a manual email to the admin.
  const sendLeaveEmail = (
    item: LeaveRequest
  ) => {
    const recipient = adminContact?.email;

    if (!recipient) {
      toast.warning(
        "Admin email is not available. Please contact your administrator."
      );
      return;
    }

    const leaveType =
      item.leaveType || item.type || "Leave";

    const startDate =
      item.startDate || item.from;

    const endDate =
      item.endDate || item.to;

    const formattedStartDate = startDate
      ? new Date(
          startDate
        ).toLocaleDateString()
      : "Not specified";

    const formattedEndDate = endDate
      ? new Date(
          endDate
        ).toLocaleDateString()
      : "Not specified";

    const subject =
      `Leave Request - ${leaveType}`;

    const body = [
      `Dear ${adminContact?.name || "Admin"},`,
      "",
      "I would like to follow up on my leave request.",
      "",
      `Leave Type: ${leaveType}`,
      `Start Date: ${formattedStartDate}`,
      `End Date: ${formattedEndDate}`,
      `Reason: ${item.reason}`,
      `Current Status: ${item.status}`,
      "",
      "Kindly review my leave request.",
      "",
      "Thank you.",
    ].join("\n");

    const opened = openEmailDraft(
      recipient,
      subject,
      body
    );

    if (!opened) {
      toast.error(
        "Unable to open the email draft."
      );
    }
  };

  const fieldClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400";

  // Give each leave status a different color.
  const getStatusClass = (
    status?: string
  ) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";

      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";

      case "Pending":
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    }
  };

  return (
    <div className="text-slate-900 transition-colors dark:text-slate-100">
      {/* Page Heading */}
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-indigo-700 dark:text-indigo-400">
          LEAVE MANAGEMENT
        </p>

        <h1 className="m-0 text-3xl font-extrabold text-slate-900 dark:text-white">
          Leave requests
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Apply for Leave */}
        <form
          className="grid content-start gap-4 rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
          onSubmit={submit}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Apply for leave
          </h2>

          {/* Leave Type */}
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Leave Type

            <select
              className={fieldClass}
              value={form.leaveType}
              onChange={(event) => {
                setForm({
                  ...form,
                  leaveType: event.target.value,
                });
              }}
            >
              <option value="Casual">
                Casual
              </option>

              <option value="Sick">
                Sick
              </option>

              <option value="Annual">
                Annual
              </option>
            </select>
          </label>

          {/* Start Date */}
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            From

            <input
              className={fieldClass}
              type="date"
              required
              min={today}
              value={form.startDate}
              onChange={(event) => {
                const startDate =
                  event.target.value;

                setDateError("");

                setForm({
                  ...form,
                  startDate,
                  endDate:
                    form.endDate &&
                    form.endDate < startDate
                      ? ""
                      : form.endDate,
                });
              }}
            />
          </label>

          {/* End Date */}
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            To

            <input
              className={fieldClass}
              type="date"
              required
              min={
                form.startDate &&
                form.startDate > today
                  ? form.startDate
                  : today
              }
              value={form.endDate}
              onChange={(event) => {
                setDateError("");

                setForm({
                  ...form,
                  endDate: event.target.value,
                });
              }}
            />
          </label>

          {/* Reason */}
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Reason

            <textarea
              className={fieldClass}
              rows={4}
              required
              value={form.reason}
              onChange={(event) => {
                setForm({
                  ...form,
                  reason: event.target.value,
                });
              }}
            />
          </label>

          {/* Validation Error */}
          {dateError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300"
            >
              {dateError}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Submitting..."
              : "Submit Request"}
          </button>

          {/* Existing Success Message */}
          {mutation.isSuccess && (
            <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              Leave request submitted successfully.
            </p>
          )}

          {/* Existing Submission Error */}
          {mutation.isError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to submit leave request."}
            </p>
          )}
        </form>

        {/* Recent Requests */}
        <section className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Requests
          </h2>

          {/* Loading State */}
          {isLoading && (
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading leave requests...
            </p>
          )}

          {/* Fetch Error */}
          {isError && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {error instanceof Error
                ? error.message
                : "Failed to load leave requests."}
            </p>
          )}

          {/* Leave Request List */}
          {!isLoading && !isError && (
            <div className="mt-3">
              {requests.map((item) => {
                const status =
                  item.status || "Pending";

                return (
                  <div
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 py-4 last:border-0 dark:border-slate-700"
                    key={item._id || item.id}
                  >
                    <div className="min-w-0">
                      <strong className="text-slate-900 dark:text-slate-100">
                        {item.leaveType ||
                          item.type ||
                          "Leave"}
                      </strong>

                      <p className="m-1 text-sm text-slate-600 dark:text-slate-400">
                        {item.startDate
                          ? new Date(
                              item.startDate
                            ).toLocaleDateString()
                          : "N/A"}

                        {" to "}

                        {item.endDate
                          ? new Date(
                              item.endDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                      {item.adminComment && (
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          Admin comment:{" "}
                          {item.adminComment}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Existing Status Badge */}
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(status)}`}
                      >
                        {status}
                      </span>

                      {/* New Send Email Button */}
                      <button
                        type="button"
                        onClick={() =>
                          sendLeaveEmail(item)
                        }
                        disabled={
                          !adminContact?.email
                        }
                        title={
                          adminContact?.email
                            ? `Email ${adminContact.name}`
                            : "No active admin email available"
                        }
                        className="shrink-0 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950"
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                );
              })}

              {!requests.length && (
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  No leave requests yet.
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
