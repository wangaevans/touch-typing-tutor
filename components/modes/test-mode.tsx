import React, { useEffect, useState } from "react";
import { RotateCcw, Target, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Stats, Settings } from "@/lib/types";
import { TimedTestTimer } from "./timed-test-timer";
import { TestSettings } from "./test-settings";
import { TestSummary } from "./test-summary";
import { TestTextDisplay } from "./test-text-display";
import { VirtualKeyboard } from "@/components/keyboard/virtual-keyboard";

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
  isTestComplete: boolean;
  strictMode: boolean;
  settings: Settings;
  pressedKeys: Set<string>;
  getKeyColor: (key: string) => string;
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
  isTestComplete,
  strictMode,
  settings,
  pressedKeys,
  getKeyColor,
}: TestModeProps) => {
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (isTestComplete) setShowSummary(true);
  }, [isTestComplete]);

  const handleCloseSummary = () => {
    setShowSummary(false);
    onRetry(); // Reset the test when closing
  };
  const handleRetry = () => {
    setShowSummary(false);
    onRetry();
  };

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl font-semibold">
                  Typing Test
                </CardTitle>
              </div>
              {settings.showAdvancedSettings && (
                <Badge variant="outline" className="text-xs">
                  {settings.testType}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Next key indicator */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Next:</span>
                <Badge variant="secondary" className="font-mono text-sm">
                  {nextKey || "Complete!"}
                </Badge>
              </div>

              {/* Strict mode indicator */}
              {strictMode && (
                <Badge
                  variant="outline"
                  className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Strict
                </Badge>
              )}

              {/* Reset button */}
              <Button
                onClick={onReset}
                size="sm"
                variant="outline"
                className="flex items-center gap-2 hover:bg-accent/50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          {/* Advanced: Finger Guide Toggle */}
          {/* (Removed, not needed for theme-based coloring) */}
          {/* Test settings and timer */}
          <div className="mt-4 space-y-3">
            <TestSettings
              isTimedTest={isTimedTest}
              onTimedTestChange={onTimedTestChange}
              testDuration={testDuration}
              onTestDurationChange={onTestDurationChange}
              settings={settings}
            />

            {isTimedTest && (
              <TimedTestTimer
                testDuration={testDuration}
                timeElapsed={stats.timeElapsed}
                isActive={
                  isTimedTest && stats.timeElapsed > 0 && !isTestComplete
                }
              />
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Virtual Keyboard for finger guidance */}
      <VirtualKeyboard
        pressedKeys={pressedKeys}
        getKeyColor={getKeyColor}
        settings={settings}
      />

      {/* Test Content */}
      {!isTestComplete && (
        <div className="space-y-6">
          {/* Test text display */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Test Text
                </h3>
              </div>
              <TestTextDisplay
                testText={testText}
                getCharacterClass={getCharacterClass}
              />
            </CardContent>
          </Card>

          {/* Input area */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Your Input
                </h3>
              </div>
              <Textarea
                ref={textareaRef}
                value={currentInput}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Start typing here to begin the test..."
                className="min-h-[140px] text-lg font-mono resize-none border-2 focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {currentInput.length} / {testText.length} characters
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Test Summary Modal */}
      <TestSummary
        isVisible={showSummary}
        isTimedTest={isTimedTest}
        stats={stats}
        testDuration={testDuration}
        onRetry={handleRetry}
        onClose={handleCloseSummary}
      />
    </div>
  );
};
