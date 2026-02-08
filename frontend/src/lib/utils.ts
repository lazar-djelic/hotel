export function formatDate(dateS: string, language: string) {
  const locale = language.startsWith("sr") ? "sr-Latn-RS" : "en-GB";

  return new Date(dateS).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
