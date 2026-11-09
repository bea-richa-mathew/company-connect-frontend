import {
  Link
} from "react-router-dom";

import {
  useQuery
} from "@tanstack/react-query";

import api from "../../services/api";

import type {
  Task,
  LeaveRequest,
  Announcement
} from "../../types";

import StatCard from "../../components/StatCard";

export default function EmployeeDashboard() {
  const {
    data: tasks = []
  } = useQuery<Task[]>({
    queryKey: ["my-tasks"],

    queryFn: async () => {
      const response =
        await api.get("/tasks");

      return response.data.data || [];
    }
  });

  const {
    data: leaves = []
  } = useQuery<LeaveRequest[]>({
    queryKey: ["my-leaves"],

    queryFn: async () => {
      const response =
        await api.get("/leaves");

      return response.data.data || [];
    }
  });

  const {
    data: announcements = []
  } = useQuery<Announcement[]>({
    queryKey: ["announcements"],

    queryFn: async () => {
      const response =
        await api.get("/announcements");

      return response.data.data || [];
    }
  });

  return (
    <div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          EMPLOYEE PORTAL
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Welcome back, Employee
        </h1>

        <p className="text-[#6d7890]">
          Here is your workplace overview.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Attendance"
          value="—"
          icon="✓"
        />

        <StatCard
          label="Pending Tasks"
          value={
            tasks.filter(
              (task) =>
                task.status !==
                "Completed"
            ).length
          }
          icon="▣"
        />

        <StatCard
          label="Leave Requests"
          value={leaves.length}
          icon="◷"
        />

        <StatCard
          label="Announcements"
          value={announcements.length}
          icon="◉"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Recent Tasks
            </h2>

            <Link
              className="text-[#3155d9]"
              to="/employee/tasks"
            >
              View all
            </Link>
          </div>

          {tasks
            .slice(0, 5)
            .map((task) => (
              <div
                className="flex items-center justify-between gap-3 border-b border-[#e2e7f0] py-3 last:border-0 dark:border-zinc-800"
                key={
                  task._id ||
                  task.id
                }
              >
                <div>
                  <strong>
                    {task.title}
                  </strong>

                  <p className="m-1 text-sm text-[#6d7890]">
                    {task.dueDate ||
                      "No due date"}
                  </p>
                </div>

                <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#3155d9] dark:bg-zinc-800 dark:text-cyan-400">
                  {task.status}
                </span>
              </div>
            ))}

          {!tasks.length && (
            <p className="text-[#6d7890] mt-3">
              No tasks assigned.
            </p>
          )}
        </section>

        <section className="rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-bold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-lg border border-[#3155d9] bg-white px-4 py-2 text-sm font-semibold text-[#3155d9] hover:bg-gray-50 dark:border-cyan-400 dark:bg-zinc-800 dark:text-cyan-400"
              to="/employee/profile"
            >
              Update Profile
            </Link>

            <Link
              className="rounded-lg border border-[#3155d9] bg-white px-4 py-2 text-sm font-semibold text-[#3155d9] hover:bg-gray-50 dark:border-cyan-400 dark:bg-zinc-800 dark:text-cyan-400"
              to="/employee/leave"
            >
              Apply Leave
            </Link>

            <Link
              className="rounded-lg border border-[#3155d9] bg-white px-4 py-2 text-sm font-semibold text-[#3155d9] hover:bg-gray-50 dark:border-cyan-400 dark:bg-zinc-800 dark:text-cyan-400"
              to="/employee/attendance"
            >
              View Attendance
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}