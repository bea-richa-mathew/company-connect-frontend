import { mockAttendance } from "../../data/mockData";

export default function Attendance() {
  return (
    <div>
      <p className="text-sm text-slate-500">Employee Portal</p>
      <h1 className="mt-2 text-3xl font-bold">Attendance</h1>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Present</p>
          <p className="mt-2 text-3xl font-bold">18</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Late</p>
          <p className="mt-2 text-3xl font-bold">2</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Leave</p>
          <p className="mt-2 text-3xl font-bold">1</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Check In</th>
                <th className="px-6 py-4 font-semibold">Check Out</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {mockAttendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">{record.checkIn}</td>
                  <td className="px-6 py-4">{record.checkOut}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                      {record.status}
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