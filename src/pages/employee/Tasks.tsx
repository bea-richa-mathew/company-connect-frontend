import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import api from "../../services/api";
import type { Task } from "../../types";

export default function Tasks() {
  const queryClient =
    useQueryClient();

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

  const mutation =
    useMutation({
      mutationFn: ({
        id,
        status
      }: {
        id: string;
        status: string;
      }) =>
        api.patch(
          `/tasks/${id}`,
          { status }
        ),

      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["my-tasks"]
        })
    });

  return (
    <div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          MY TASKS
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Assigned tasks
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map(
          (task) => (
            <article
              className="rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm"
              key={
                task._id ||
                task.id
              }
            >
              <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-bold text-[#3155d9]">
                {task.priority} priority
              </span>

              <h3>
                {task.title}
              </h3>

              <p className="text-[#6d7890]">
                {task.description}
              </p>

              <p>
                <strong>
                  Due:
                </strong>{" "}
                {task.dueDate ||
                  "Not specified"}
              </p>

              <select
                className="w-full rounded-lg border border-[#d7deea] px-3 py-2"
                value={task.status}
                onChange={(event) =>
                  mutation.mutate({
                    id:
                      task._id ||
                      task.id ||
                      "",
                    status:
                      event.target.value
                  })
                }
              >
                <option>
                  Pending
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>
              </select>
            </article>
          )
        )}

        {!tasks.length && (
          <div className="text-[#6d7890]">
            No tasks assigned.
          </div>
        )}
      </div>
    </div>
  );
}