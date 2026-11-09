
interface Props {
  dueDate?: string | null;
  status: string;
}

export default function TaskDeadlineBadge({
  dueDate,
  status
}: Props) {
  if (!dueDate) return null;

  if (status === "Completed") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        Completed
      </span>
    );
  }

  const now = new Date();
  const deadline = new Date(dueDate);

  if (Number.isNaN(deadline.getTime())) {
    return null;
  }

  const hoursRemaining =
    (deadline.getTime() - now.getTime()) /
    (1000 * 60 * 60);

  if (hoursRemaining < 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Overdue
      </span>
    );
  }

  if (hoursRemaining <= 24) {
    return (
      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
        Due Soon
      </span>
    );
  }

  return (
    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
      Upcoming
    </span>
  );
}
