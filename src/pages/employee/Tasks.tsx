import { mockTasks } from "../../data/mockData";

export default function Tasks() {
  return (
    <div>
      <p className="text-sm text-slate-500">Employee Portal</p>

      <h1 className="mt-2 text-3xl font-bold">My Tasks</h1>

      <div className="mt-8 grid gap-5">
        {mockTasks.map((task) => (
          <article
            key={task.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    {task.priority} Priority
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    {task.status}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold">{task.title}</h2>

                <p className="mt-2 leading-7 text-slate-600">
                  {task.description}
                </p>
              </div>

              <div className="text-sm text-slate-500">
                Due: <span className="font-semibold">{task.dueDate}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}