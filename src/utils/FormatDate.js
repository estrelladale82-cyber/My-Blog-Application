export function formatDate(dateString, monthStyle = "short") {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: monthStyle,
    year: "numeric",
  });
}