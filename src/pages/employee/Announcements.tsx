import {
  useQuery
} from "@tanstack/react-query";

import api from "../../services/api";
import type {
  Announcement
} from "../../types";

export default function Announcements() {
  const {
    data = []
  } = useQuery<Announcement[]>({
    queryKey: ["announcements"],

    queryFn: async () => {
      const response =
        await api.get(
          "/announcements"
        );

      return response.data.data || [];
    }
  });

  return (
    <div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          ANNOUNCEMENTS
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Company updates
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {data.map(
          (announcement) => (
            <article
              className="rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-sm"
              key={
                announcement._id ||
                announcement.id
              }
            >
              <p className="text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
                COMPANY UPDATE
              </p>

              <h2>
                {announcement.title}
              </h2>

              <p className="text-[#6d7890]">
                {announcement.message}
              </p>
            </article>
          )
        )}

        {!data.length && (
          <p className="text-[#6d7890]">
            No announcements available.
          </p>
        )}
      </div>
    </div>
  );
}