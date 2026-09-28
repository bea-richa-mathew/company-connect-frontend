import { useState } from "react";
import Button from "../../components/Button";
import { mockLeaveRequests } from "../../data/mockData";

export default function Leave() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-500">Employee Portal</p>
          <h1 className="mt-2 text-3xl font-bold">Leave Management</h1>
        </div>

        <Button onClick={() => setShowForm((value) => !value)}>
          {showForm ? "Close Form" : "Apply for Leave"}
        </Button>
      </div>

      {showForm && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">New Leave Request</h2>

          <form className="mt-6 grid gap-5 md:grid-cols-2">
            <select className="rounded-xl border border-slate-300 px-4 py-3">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
            </select>

            <input
              type="date"
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              type="date"
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              placeholder="Reason"
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <Button type="button">Submit Request</Button>
          </form>
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Days</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {mockLeaveRequests.map((leave) => (
                <tr key={leave.id}>
                  <td className="px-6 py-4 font-medium">{leave.type}</td>
                  <td className="px-6 py-4">{leave.from}</td>
                  <td className="px-6 py-4">{leave.to}</td>
                  <td className="px-6 py-4">{leave.days}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}