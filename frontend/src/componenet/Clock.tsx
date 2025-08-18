import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="text-white p-6 rounded-full shadow-2xl cursor-context-menu flex flex-col items-center justify-center w-40 h-40">
      <span className="text-3xl font-bold">{hours}:{minutes}:{seconds}</span>
      <span className="text-xs mt-1 text-white">
        {time.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
      </span>
    </div>
  );
};

export default Clock;
