import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      // Calculate remaining difference towards a standard daily flash sale
      const endOfDay = new Date(now);
      endOfDay.setHours(now.getHours() + 2, now.getMinutes() + 45, now.getSeconds() + 12);
      
      const diff = endOfDay.getTime() - now.getTime();
      
      if (diff <= 0) {
        return { hours: 2, minutes: 45, seconds: 12 };
      }
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      return { hours, minutes, seconds };
    };

    // Keep state ticking naturally
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 45, seconds: 12 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padZero = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
      {/* Hours */}
      <div className="bg-pink-550/5 text-pink-700 bg-pink-50/50 border border-pink-100/80 px-2 py-1 rounded-sm font-mono font-bold select-none min-w-[32px] text-center shadow-xs">
        {padZero(timeLeft.hours)}
      </div>

      <div className="text-pink-300 font-bold px-0.5 select-none animate-pulse">:</div>

      {/* Minutes */}
      <div className="bg-pink-550/5 text-pink-700 bg-pink-50/50 border border-pink-100/80 px-2 py-1 rounded-sm font-mono font-bold select-none min-w-[32px] text-center shadow-xs">
        {padZero(timeLeft.minutes)}
      </div>

      <div className="text-pink-300 font-bold px-0.5 select-none animate-pulse">:</div>

      {/* Seconds */}
      <div className="bg-pink-550/5 text-pink-700 bg-pink-50/50 border border-pink-100/80 px-2 py-1 rounded-sm font-mono font-bold select-none min-w-[32px] text-center shadow-xs">
        {padZero(timeLeft.seconds)}
      </div>
    </div>
  );
}
