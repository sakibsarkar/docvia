const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const formatSecondsToMMSS = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${pad(m)}:${pad(s)}`;
};

function formatToMMMdddYYYY(input: string | number | Date | undefined): string {
  if (!input) return "";
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date value");
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const getExpirationDate = (startDate?: Date | string, expireAfterDays?: number) => {
  if (!startDate || !expireAfterDays) return "";
  const date = new Date(startDate);
  date.setDate(date.getDate() + expireAfterDays);
  return date;
};

const dateUtils = { formatSecondsToMMSS, formatToMMMdddYYYY, getExpirationDate };
export default dateUtils;
