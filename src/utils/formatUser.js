export function formatUser(name) {
  if (typeof name !== "string") return "Unknown";
  const cleaned = name.trim();
  if (cleaned.length === 0) return "Unknown";
  if (cleaned.length === 1) return cleaned.toUpperCase();
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
