const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const formatSecondsToMMSS = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${pad(m)}:${pad(s)}`;
};

const dateUtils = { formatSecondsToMMSS };
export default dateUtils;
