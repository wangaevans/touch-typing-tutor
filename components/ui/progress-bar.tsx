import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  label: string;
  showPercentage?: boolean;
}

export const ProgressBar = ({
  progress,
  label,
  showPercentage = true,
}: ProgressBarProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">{label}</span>
      {showPercentage && (
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      )}
    </div>
    <Progress value={progress} className="h-3" />
  </div>
);
