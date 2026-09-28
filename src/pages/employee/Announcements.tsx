import { mockAnnouncements } from "../../data/mockData";

export default function Announcements() {
  return (
    <div>
      <p className="text-sm text-slate-500">Employee Portal</p>

      <h1 className="mt-2 text-3xl font-bold">Announcements</h1>

      <div className="mt-8 space-y-5">
        {mockAnnouncements.map((announcement) => (
          <article
            key={announcement.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                {announcement.category}
              </span>

              <span className="text-sm text-slate-500">
                {announcement.date}
              </span>
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {announcement.title}
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {announcement.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}