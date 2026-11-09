
import { useMemo } from "react";
import TeamChat from "../../components/TeamChat";

function getEmployeeId(token: string | null) {
  if (!token) return null;

  try {
    const part = token.split(".")[1];

    if (!part) return null;

    const base64 = part
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    return payload.id
      ? String(payload.id)
      : null;
  } catch {
    return null;
  }
}

export default function Messages() {
  const token = localStorage.getItem(
    "employeeToken"
  );

  const currentUserId = useMemo(
    () => getEmployeeId(token),
    [token]
  );

  return (
    <TeamChat
      token={token}
      currentUserId={currentUserId}
      title="Messages"
    />
  );
}
