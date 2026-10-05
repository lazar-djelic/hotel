export function formatDate(dateS: string, language: string) {
  const locale = language.startsWith("sr") ? "sr-Latn-RS" : "en-GB";

  return new Date(dateS).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateU(dateS: string | undefined, language: string) {
  const locale = language.startsWith("sr") ? "sr-Latn-RS" : "en-GB";
  if (dateS !== undefined)
    return new Date(dateS).toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
}

export function formatTime(date: string) {
  const d = new Date(date);

  const hours = d.getUTCHours().toString().padStart(2, "0");
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function formatTimeU(date: string | undefined) {
  if (date === undefined) return;

  const d = new Date(date);

  const hours = d.getUTCHours().toString().padStart(2, "0");
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
