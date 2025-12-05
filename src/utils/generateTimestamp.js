export default function generateTimestamp(type) {
  const now = new Date();

  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return type === "id"
    ? `${YYYY}${MM}${DD}${HH}${mm}${ss}`
    : `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
}
