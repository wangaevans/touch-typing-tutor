import React from "react";
import { RotateCcw, Settings, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Stats } from "@/lib/types";

interface TestModeProps {
  testText: string;
  currentInput: string;
  onInputChange: (value: string) => void;
  onReset: () => void;
  onOpenSettings: () => void;
  nextKey: string | null;
  getCharacterClass: (index: number) => string;
  stats: Stats;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const TestMode = ({
  testText,
  currentInput,
  onInputChange,
  onReset,
  onOpenSettings,
  nextKey,
  getCharacterClass,
  stats,
  textareaRef,
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
            <Button
              onClick={onOpenSettings}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-card rounded-lg p-6 border-2 border-border font-mono text-lg leading-relaxed">
          {testText.split("").map((char, index) => (
            <span
              key={index}
              className={`${getCharacterClass(index)} px-0.5 py-1 rounded`}
            >
              {char}
            </span>
          ))}
        </div>

        <Textarea
          ref={textareaRef}
          value={currentInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Start typing here..."
          className="min-h-[120px] text-lg font-mono resize-none"
          disabled={currentInput === testText}
        />

        {currentInput === testText && (
          <Alert>
            <Trophy className="h-4 w-4" />
            <AlertDescription>
              Test completed! Your WPM: {stats.wpm}, Accuracy: {stats.accuracy}%
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
