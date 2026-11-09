
export function openEmailDraft(
  recipient: string | null | undefined,
  subject: string,
  body: string
): boolean {
  const email = recipient?.trim();

  if (!email) {
    return false;
  }

  const mailtoUrl =
    `mailto:${email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;

  return true;
}
