import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import { useAuth } from "../../context/AuthContext";
import {
  mockAnnouncements,
  mockLeaveRequests,
  mockTasks,
} from "../../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();

  const pendingTasks = mockTasks.filter(
    (task) => task.status !== "Completed",
  ).length;

  const pendingLeave = mockLeaveRequests.filter(
    (leave) => leave.status === "Pending",
  ).length;

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-slate-500">
          Employee Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Good afternoon, {user?.name.split(" ")[0]} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your work and company updates.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Department"
          value={user?.department ?? "-"}
          description={user?.designation}
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          description="Tasks requiring attention"
        />

        <StatCard
          title="Leave Requests"
          value={pendingLeave}
          description="Pending approval"
        />

        <StatCard
          title="Leave Balance"
          value="12"
          description="Available days"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">My Tasks</h2>

            <Link
              to="/employee/tasks"
              className="text-sm font-semibold text-slate-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {mockTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Due {task.dueDate}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-slate-600">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Latest Announcements</h2>

            <Link
              to="/employee/announcements"
              className="text-sm font-semibold text-slate-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {mockAnnouncements.slice(0, 3).map((announcement) => (
              <div key={announcement.id}>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  {announcement.category}
                </p>

                <h3 className="mt-1 font-semibold">
                  {announcement.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {announcement.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}