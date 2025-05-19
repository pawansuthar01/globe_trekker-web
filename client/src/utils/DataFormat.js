const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

export default formatDate;

export const formatTime = (dateString) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const past = new Date(dateString);
  const diff = (now.getTime() - past.getTime()) / 1000;

  if (diff < 60) return rtf.format(-Math.floor(diff), "second");
  if (diff < 3600) return rtf.format(-Math.floor(diff / 60), "minute");
  if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), "hour");
  if (diff < 604800) return rtf.format(-Math.floor(diff / 86400), "day");
  return past.toLocaleDateString();
};
