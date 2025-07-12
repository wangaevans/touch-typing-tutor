import React, { useState } from "react";
import { Clock, Timer, Zap, Edit3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "@/lib/types";
import { TEST_LEVELS, TEST_TYPES } from "@/lib/advanced-tests";

interface TestSettingsProps {
  isTimedTest: boolean;
  onTimedTestChange: (isTimed: boolean) => void;
  testDuration: number;
  onTestDurationChange: (duration: number) => void;
  settings?: Settings;
}

export const TestSettings = ({
  isTimedTest,
  onTimedTestChange,
  testDuration,
  onTestDurationChange,
  settings,
}: TestSettingsProps) => {
  const [showCustomDuration, setShowCustomDuration] = useState(false);
  const [customDuration, setCustomDuration] = useState("");

  const handleCustomDurationSubmit = () => {
    const duration = parseInt(customDuration);
    if (duration > 0 && duration <= 3600) {
      // Max 1 hour
      onTestDurationChange(duration);
      setShowCustomDuration(false);
      setCustomDuration("");
    }
  };

  const handleCustomDurationKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCustomDurationSubmit();
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  };

  const isCustomDuration = ![10, 30, 60, 120, 300, 600].includes(testDuration);

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

          {!showCustomDuration ? (
            <div className="flex items-center gap-2">
              <Select
                value={isCustomDuration ? "custom" : testDuration.toString()}
                onValueChange={(value) => {
                  if (value === "custom") {
                    setShowCustomDuration(true);
                  } else {
                    onTestDurationChange(parseInt(value));
                  }
                }}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10s</SelectItem>
                  <SelectItem value="30">30s</SelectItem>
                  <SelectItem value="60">1m</SelectItem>
                  <SelectItem value="120">2m</SelectItem>
                  <SelectItem value="300">5m</SelectItem>
                  <SelectItem value="600">10m</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {isCustomDuration && (
                <Badge variant="outline" className="text-xs">
                  {formatDuration(testDuration)}
                </Badge>
              )}

              <Button
                onClick={() => setShowCustomDuration(true)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                title="Set custom duration"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Seconds"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                onKeyPress={handleCustomDurationKeyPress}
                className="w-20 h-8 text-sm"
                min="1"
                max="3600"
              />
              <span className="text-xs text-muted-foreground">seconds</span>
              <Button
                onClick={handleCustomDurationSubmit}
                size="sm"
                variant="outline"
                className="h-8 px-2 text-xs"
              >
                Set
              </Button>
              <Button
                onClick={() => {
                  setShowCustomDuration(false);
                  setCustomDuration("");
                }}
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-xs"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Advanced Test Info */}
      {settings?.showAdvancedSettings && (
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Advanced:</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {TEST_LEVELS.find((level) => level.id === settings.testLevel)
                ?.name || settings.testLevel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {TEST_TYPES.find((type) => type.id === settings.testType)?.name ||
                settings.testType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {settings.testLength}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
