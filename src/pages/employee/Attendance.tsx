import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import api from "../../services/api";
import type {
  Attendance as AttendanceType
} from "../../types";

import StatCard from "../../components/StatCard";

export default function Attendance() {
  const queryClient =
    useQueryClient();

  const {
    data: attendance = []
  } = useQuery<AttendanceType[]>({
    queryKey: ["attendance"],

    queryFn: async () => {
      const response =
        await api.get("/attendance");

      return response.data.data || [];
    }
  });

  const checkIn =
    useMutation({
      mutationFn: () =>
        api.post(
          "/attendance/check-in"
        ),

      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["attendance"]
        })
    });

  const checkOut =
    useMutation({
      mutationFn: () =>
        api.post(
          "/attendance/check-out"
        ),

      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["attendance"]
        })
    });

  const today =
    attendance.find(
      (item) =>
        item.date ===
        new Date()
          .toISOString()
          .slice(0, 10)
    );

  return (
    <div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          ATTENDANCE
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Attendance overview
        </h1>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Recorded Days"
          value={attendance.length}
          icon="✓"
        />

        <StatCard
          label="Today"
          value={
            today?.status ||
            "Not marked"
          }
          icon="◷"
        />

        <StatCard
          label="Work Hours"
          value="—"
          icon="⌚"
        />
      </div>

      <section className="rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm">
        <h2>Today</h2>

        <p className="text-[#6d7890]">
          {today?.checkIn
            ? `Checked in at ${new Date(
                today.checkIn
              ).toLocaleTimeString()}`
            : "You have not checked in yet."}
        </p>

        {today?.checkIn &&
        !today.checkOut ? (
          <button
            className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white"
            onClick={() =>
              checkOut.mutate()
            }
            disabled={
              checkOut.isPending
            }
          >
            Check Out
          </button>
        ) : !today?.checkIn ? (
          <button
            className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white"
            onClick={() =>
              checkIn.mutate()
            }
            disabled={
              checkIn.isPending
            }
          >
            Check In
          </button>
        ) : (
          <span className="rounded-full bg-[#e4f7ec] px-3 py-1 text-sm font-semibold text-[#167044]">
            Completed
          </span>
        )}
      </section>
    </div>
  );
}