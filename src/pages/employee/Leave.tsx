import {
  useState,
  type FormEvent
} from "react";

import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import api from "../../services/api";
import type {
  LeaveRequest
} from "../../types";

export default function Leave() {
  const queryClient = useQueryClient();

  // Updated state property names to match backend expectations
  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const { data: requests = [] } = useQuery<LeaveRequest[]>({
    queryKey: ["my-leaves"],
    queryFn: async () => {
      const response = await api.get("/leaves");
      return response.data.data || [];
    }
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/leaves", {
        leaveType: form.leaveType,
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason
      }),

    onSuccess: () => {
      setForm({
        leaveType: "Casual",
        startDate: "",
        endDate: "",
        reason: ""
      });

      queryClient.invalidateQueries({
        queryKey: ["my-leaves"]
      });
    }
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          LEAVE MANAGEMENT
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Leave requests
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <form
          className="grid gap-4 rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm"
          onSubmit={submit}
        >
          <h2>Apply for leave</h2>

          <label>
            Leave Type
            <select
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={form.leaveType}
              onChange={(event) =>
                setForm({
                  ...form,
                  leaveType: event.target.value
                })
              }
            >
              <option value="Casual">Casual</option>
              <option value="Sick">Sick</option>
              <option value="Annual">Annual</option>
            </select>
          </label>

          <label>
            From
            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              type="date"
              required
              value={form.startDate}
              onChange={(event) =>
                setForm({
                  ...form,
                  startDate: event.target.value
                })
              }
            />
          </label>

          <label>
            To
            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              type="date"
              required
              value={form.endDate}
              onChange={(event) =>
                setForm({
                  ...form,
                  endDate: event.target.value
                })
              }
            />
          </label>

          <label>
            Reason
            <textarea
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              required
              value={form.reason}
              onChange={(event) =>
                setForm({
                  ...form,
                  reason: event.target.value
                })
              }
            />
          </label>

          <button
            className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white"
            disabled={mutation.isPending}
          >
            Submit Request
          </button>

          {mutation.isSuccess && (
            <p className="rounded-lg bg-[#e7f8ef] p-3 text-[#167044]">
              Leave request submitted.
            </p>
          )}

          {mutation.isError && (
            <p className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to submit leave request."}
            </p>
          )}
        </form>

        <section className="rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm">
          <h2>Recent Requests</h2>

          {requests.map((item) => (
  <div
    className="flex items-center justify-between gap-3 border-b border-[#e2e7f0] py-3 last:border-0"
    key={item._id || item.id}
  >
    <div>
      <strong>
        {item.leaveType || item.type || "Leave"}
      </strong>

      <p className="m-1 text-sm text-[#6d7890]">
        {item.startDate
          ? new Date(item.startDate).toLocaleDateString()
          : "N/A"}
        {" to "}
        {item.endDate
          ? new Date(item.endDate).toLocaleDateString()
          : "N/A"}
      </p>
    </div>

    <span className="rounded-full bg-[#fff4d8] px-3 py-1 text-xs font-bold text-[#9a6700]">
      {item.status || "Pending"}
    </span>
  </div>
))}

          {!requests.length && (
            <p className="text-[#6d7890]">
              No leave requests yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}