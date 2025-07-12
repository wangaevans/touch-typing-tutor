import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";

interface TimedTestTimerProps {
  testDuration: number;
  timeElapsed: number;
  isActive: boolean;
}

export const TimedTestTimer = ({
  testDuration,
  timeElapsed,
  isActive,
}: TimedTestTimerProps) => {
  const [displayTime, setDisplayTime] = useState(0);

  // Update display time less frequently to reduce unnecesary UI re-rendering
  useEffect(() => {
    if (!isActive) return;

    const timeRemaining = Math.max(0, testDuration - timeElapsed);
    setDisplayTime(timeRemaining);

    // Update display every 500ms instead of every 250ms to reduce UI updates
    const interval = setInterval(() => {
      const currentTimeRemaining = Math.max(0, testDuration - timeElapsed);
      setDisplayTime(currentTimeRemaining);
    }, 500);

    return () => clearInterval(interval);
  }, [testDuration, timeElapsed, isActive]);

  if (!isActive) return null;

  return (
    <div className="flex justify-center mt-2">
      <div className="bg-primary/10 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Time Remaining: {displayTime}s
          </span>
        </div>
      </div>
    </div>
  );
};
