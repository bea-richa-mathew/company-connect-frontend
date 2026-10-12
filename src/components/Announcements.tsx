
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

interface Announcement {
  _id: string;
  title: string;
  message: string;
  category?: string;
  createdAt?: string;
}

export default function Announcements() {
  const { data, isLoading, isError } = useQuery<{
    success: boolean;
    data: Announcement[];
  }>({
    queryKey: ["public-announcements"],
    queryFn: async () => {
      const response = await api.get("/announcements");
      return response.data;
    },
  });

  const announcements = data?.data ?? [];

  return (
    <section className="bg-white px-6 py-12 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold uppercase tracking-widest text-indigo-500">
          Company Updates
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Latest Announcements
        </h2>

        {isLoading && <p className="mt-5">Loading announcements...</p>}

        {isError && (
          <p className="mt-5 text-red-500">
            Unable to load announcements.
          </p>
        )}

        {!isLoading && !isError && announcements.length === 0 && (
          <p className="mt-5 text-gray-500">
            No announcements available.
          </p>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((item) => (
            <article
              key={item._id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              {item.category && (
                <p className="text-sm text-indigo-500">
                  {item.category}
                </p>
              )}

              <h3 className="mt-2 text-xl font-bold">{item.title}</h3>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600 dark:text-gray-300">
                {item.message}
              </p>

              {item.createdAt && (
                <p className="mt-4 text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
