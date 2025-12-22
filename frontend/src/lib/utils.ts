export function formatDate(dateS: string) {
  const date = new Date(dateS);
  return new Date(date).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
