
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, LogIn, LogOut, RefreshCw } from "lucide-react";

import api from "../../services/api";

interface AttendanceRecord {
  _id: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
  status: "Present" | "Absent" | "Half-day" | "Leave";
  notes?: string;
}

interface AttendanceResponse {
  success: boolean;
  data?: AttendanceRecord[];
  message?: string;
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString();
}

function formatTime(value?: string | null) {
  if (!value) return "Not recorded";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Not recorded"
    : date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
}

export default function Attendance() {
  const queryClient = useQueryClient();

  const historyQuery = useQuery<AttendanceResponse>({
    queryKey: ["my-attendance"],
    queryFn: async () => {
      const response = await api.get("/attendance");
      return response.data;
    },
  });

  const todayQuery = useQuery<AttendanceResponse>({
    queryKey: ["my-attendance-today"],
    queryFn: async () => {
      const response = await api.get("/attendance/today");
      return response.data;
    },
  });

  const history = historyQuery.data?.data ?? [];

  const today = useMemo(() => {
    const records = todayQuery.data?.data ?? [];
    return records[0];
  }, [todayQuery.data]);

  const checkInMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/attendance/check-in");
      return response.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["my-attendance"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-attendance-today"],
        }),
      ]);
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/attendance/check-out");
      return response.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["my-attendance"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-attendance-today"],
        }),
      ]);
    },
  });

  const errorMessage =
    checkInMutation.error instanceof Error
      ? checkInMutation.error.message
      : checkOutMutation.error instanceof Error
        ? checkOutMutation.error.message
        : "";

  const requestError =
    checkInMutation.isError || checkOutMutation.isError;

  const isLoading =
    historyQuery.isLoading || todayQuery.isLoading;

  const refresh = async () => {
    await Promise.all([
      historyQuery.refetch(),
      todayQuery.refetch(),
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Attendance
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Record your working hours and review your attendance history.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={historyQuery.isFetching || todayQuery.isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {(historyQuery.isError || todayQuery.isError) && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          Unable to load attendance. Please check your connection and
          refresh the page.
        </div>
      )}

      {requestError && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {errorMessage || "Unable to record attendance. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-[#252936] dark:bg-[#101218]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
              <LogIn size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check In
              </p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {formatTime(today?.checkIn)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => checkInMutation.mutate()}
            disabled={
              isLoading ||
              !todayQuery.isSuccess ||
              Boolean(today?.checkIn) ||
              checkInMutation.isPending ||
              checkOutMutation.isPending
            }
            className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checkInMutation.isPending
              ? "Checking in..."
              : today?.checkIn
                ? "Already Checked In"
                : "Check In"}
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-[#252936] dark:bg-[#101218]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-700 dark:bg-orange-950 dark:text-orange-400">
              <LogOut size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check Out
              </p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {formatTime(today?.checkOut)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => checkOutMutation.mutate()}
            disabled={
              isLoading ||
              !todayQuery.isSuccess ||
              !today?.checkIn ||
              Boolean(today?.checkOut) ||
              checkInMutation.isPending ||
              checkOutMutation.isPending
            }
            className="mt-5 w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checkOutMutation.isPending
              ? "Checking out..."
              : today?.checkOut
                ? "Already Checked Out"
                : "Check Out"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-[#252936] dark:bg-[#101218] sm:p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Today's Attendance
        </h2>

        {isLoading ? (
          <p className="py-6 text-sm text-gray-500 dark:text-gray-400">
            Loading attendance...
          </p>
        ) : today ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date
              </p>
              <p className="mt-1 text-gray-900 dark:text-white">
                {formatDate(today.date)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {today.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Working Hours
              </p>
              <p className="mt-1 text-gray-900 dark:text-white">
                {today.checkIn && today.checkOut
                  ? (() => {
                      const duration =
                        new Date(today.checkOut).getTime() -
                        new Date(today.checkIn).getTime();

                      if (duration < 0) return "—";

                      const hours = Math.floor(duration / 3600000);
                      const minutes = Math.floor(
                        (duration % 3600000) / 60000
                      );

                      return `${hours}h ${minutes}m`;
                    })()
                  : "In progress"}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <Clock
              size={30}
              className="mx-auto text-gray-400"
            />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              No attendance recorded for today. Check in to get started.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-[#252936] dark:bg-[#101218] sm:p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Attendance History
        </h2>

        {historyQuery.isLoading ? (
          <p className="py-6 text-sm text-gray-500 dark:text-gray-400">
            Loading attendance history...
          </p>
        ) : history.length === 0 ? (
          <p className="py-6 text-sm text-gray-500 dark:text-gray-400">
            No attendance records found.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Check In</th>
                  <th className="px-4 py-3">Check Out</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>

              <tbody>
                {history.map((record) => (
                  <tr
                    key={record._id}
                    className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                  >
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {formatTime(record.checkIn)}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {formatTime(record.checkOut)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : record.status === "Absent"
                              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                              : record.status === "Leave"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {record.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
