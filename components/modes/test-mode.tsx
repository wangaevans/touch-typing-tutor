import React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Stats } from "@/lib/types";
import { TimedTestTimer } from "./timed-test-timer";
import { TestSettings } from "./test-settings";
import { TestSummary } from "./test-summary";
import { TestTextDisplay } from "./test-text-display";

interface TestModeProps {
  testText: string;
  currentInput: string;
  onInputChange: (value: string) => void;
  onReset: () => void;
  onRetry: () => void;
  nextKey: string | null;
  getCharacterClass: (index: number) => string;
  stats: Stats;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  testDuration: number;
  onTestDurationChange: (duration: number) => void;
  isTimedTest: boolean;
  onTimedTestChange: (isTimed: boolean) => void;
}

export const TestMode = ({
  testText,
  currentInput,
  onInputChange,
  onReset,
  onRetry,
  nextKey,
  getCharacterClass,
  stats,
  textareaRef,
  testDuration,
  onTestDurationChange,
  isTimedTest,
  onTimedTestChange,
}: TestModeProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <img
              src="/tt-tutor-logo.svg"
              alt="TT Tutor Logo"
              className="h-5 w-auto"
            />
            <span>Typing Test</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Next: {nextKey || "Complete!"}</Badge>
            <Button
              onClick={onReset}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <TestSettings
          isTimedTest={isTimedTest}
          onTimedTestChange={onTimedTestChange}
          testDuration={testDuration}
          onTestDurationChange={onTestDurationChange}
        />

        <TimedTestTimer
          testDuration={testDuration}
          timeElapsed={stats.timeElapsed}
          isActive={isTimedTest && stats.timeElapsed > 0}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {!(
          currentInput.length >= testText.length ||
          (isTimedTest && stats.timeElapsed >= testDuration)
        ) && (
          <>
            <TestTextDisplay
              testText={testText}
              getCharacterClass={getCharacterClass}
            />

            {/* Textarea */}
            <Textarea
              ref={textareaRef}
              value={currentInput}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Start typing here..."
              className="min-h-[120px] text-lg font-mono resize-none"
            />
          </>
        )}

        <TestSummary
          isVisible={
            currentInput.length >= testText.length ||
            (isTimedTest && stats.timeElapsed >= testDuration)
          }
          isTimedTest={isTimedTest}
          stats={stats}
          testDuration={testDuration}
          onReset={onReset}
          onRetry={onRetry}
        />
      </CardContent>
    </Card>
  );
};
