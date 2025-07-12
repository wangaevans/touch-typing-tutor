import React from "react";
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
  if (!isActive) return null;

  const timeRemaining = Math.max(0, testDuration - timeElapsed);

  return (
    <div className="flex justify-center mt-2">
      <div className="bg-primary/10 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Time Remaining: {timeRemaining}s
          </span>
        </div>
      </div>
    </div>
  );
};
