import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyboardKey } from "./keyboard-key";
import { Settings } from "@/lib/types";
import { KEYBOARD_LAYOUT } from "@/lib/constants";

interface VirtualKeyboardProps {
  pressedKeys: Set<string>;
  getKeyColor: (key: string) => string;
  settings: Settings;
}

export const VirtualKeyboard = ({
  pressedKeys,
  getKeyColor,
  settings,
}: VirtualKeyboardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          Virtual Keyboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg"
          style={{ transform: `scale(${settings.keyboardSize / 100})` }}
        >
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((keyObj) => (
                <KeyboardKey
                  key={keyObj.key}
                  keyObj={keyObj}
                  isPressed={
                    pressedKeys.has(keyObj.key) ||
                    pressedKeys.has(keyObj.key.toLowerCase())
                  }
                  isHighlighted={false}
                  getKeyColor={getKeyColor}
                  settings={settings}
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
