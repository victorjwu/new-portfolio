import { useEffect, useState } from "react";

function formatSF() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function useSFTime() {
  const [time, setTime] = useState(() => formatSF());
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatSF()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
