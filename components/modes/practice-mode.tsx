import React from "react";
import { RotateCcw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { VirtualKeyboard } from "@/components/keyboard/virtual-keyboard";
import FingerGuide from "@/components/keyboard/finger-guide";
import { Settings as SettingsType } from "@/lib/types";

interface PracticeModeProps {
  practiceInput: string;
  onPracticeInputChange: (value: string) => void;
  onReset: () => void;
  isPracticeTyping: boolean;
  pressedKeys: Set<string>;
  getKeyColor: (key: string) => string;
  settings: SettingsType;
  practiceTextareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const PracticeMode = ({
  practiceInput,
  onPracticeInputChange,
  onReset,
  isPracticeTyping,
  pressedKeys,
  getKeyColor,
  settings,
  practiceTextareaRef,
}: PracticeModeProps) => {
  return (
    <>
      <VirtualKeyboard
        pressedKeys={pressedKeys}
        getKeyColor={getKeyColor}
        settings={settings}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
                     Practice Mode
            </CardTitle>
            <div className="flex items-center gap-2">
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">
              Practice your typing skills freely. Your WPM and timing will not be
              tracked.
            </Label>
          </div>

          <Textarea
            ref={practiceTextareaRef}
            value={practiceInput}
            onChange={(e) => onPracticeInputChange(e.target.value)}
            placeholder="Start practicing your typing here... Type anything you want!"
            className="min-h-[200px] text-lg font-mono resize-none"
          />

          {isPracticeTyping && (
            <Alert>
              <Play className="h-4 w-4" />
              <AlertDescription>
                Practice in progress! Keep typing to improve your skills.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <FingerGuide show={false} settings={settings} />
    </>
  );
};
