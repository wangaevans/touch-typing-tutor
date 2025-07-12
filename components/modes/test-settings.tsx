import React from "react";
import { Clock, Timer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestSettingsProps {
  isTimedTest: boolean;
  onTimedTestChange: (isTimed: boolean) => void;
  testDuration: number;
  onTestDurationChange: (duration: number) => void;
}

export const TestSettings = ({
  isTimedTest,
  onTimedTestChange,
  testDuration,
  onTestDurationChange,
}: TestSettingsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Test Type:</span>
        <Select
          value={isTimedTest ? "timed" : "text"}
          onValueChange={(value) => onTimedTestChange(value === "timed")}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text-based</SelectItem>
            <SelectItem value="timed">Timed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isTimedTest && (
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Duration:</span>
          <Select
            value={testDuration.toString()}
            onValueChange={(value) => onTestDurationChange(parseInt(value))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10s</SelectItem>
              <SelectItem value="30">30s</SelectItem>
              <SelectItem value="60">1m</SelectItem>
              <SelectItem value="120">2m</SelectItem>
              <SelectItem value="300">5m</SelectItem>
              <SelectItem value="600">10m</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
