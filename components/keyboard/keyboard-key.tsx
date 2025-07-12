import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type KeyboardKey as IK, type Settings } from "@/lib/types";
import { KEYBOARD_THEMES, KEY_FINGER_MAP } from "@/lib/constants";

interface KeyboardKeyProps {
  keyObj: IK;
  isPressed: boolean;
  isHighlighted: boolean;
  getKeyColor: (key: string) => string;
  settings: Settings;
}

export const KeyboardKey = ({
  keyObj,
  isPressed,
  isHighlighted,
  getKeyColor,
  settings,
}: KeyboardKeyProps) => {
  const baseWidth = 40 * (settings.keyboardSize / 100);
  const keyWidth = baseWidth * (keyObj.width || 1);
  const theme = KEYBOARD_THEMES[settings.keyboardTheme];

  const getKeyStyle = () => {
    const baseStyle = {
      width: `${keyWidth}px`,
      height: `${baseWidth}px`,
      transition: "all 200ms ease",
    };

    if (settings.keyboardTheme === "colorful") {
      const fingerColor = getKeyColor(keyObj.key);
      return {
        ...baseStyle,
        backgroundColor: isPressed
          ? `color-mix(in srgb, ${fingerColor} 70%, black)`
          : fingerColor,
        color: theme.keyText,
        boxShadow: isHighlighted
          ? `0 0 ${settings.highlightIntensity / 10}px ${fingerColor}`
          : "none",
      };
    }

    if (settings.keyboardTheme === "gradient") {
      return {
        ...baseStyle,
        background: isPressed ? theme.pressedBg : theme.keyBg,
        color: isPressed ? theme.pressedText : theme.keyText,
        boxShadow: isHighlighted
          ? `0 0 ${settings.highlightIntensity / 10}px rgba(59, 130, 246, 0.6)`
          : "none",
      };
    }

    return {
      ...baseStyle,
      backgroundColor: isPressed ? theme.pressedBg : theme.keyBg,
      color: isPressed ? theme.pressedText : theme.keyText,
      borderColor: theme.borderColor,
      boxShadow: isHighlighted
        ? `0 0 ${settings.highlightIntensity / 10}px rgba(59, 130, 246, 0.6)`
        : "none",
    };
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              flex items-center justify-center rounded-lg text-xs font-medium
              transition-all duration-200 border-2 select-none cursor-pointer
              ${
                isPressed
                  ? "transform scale-95 shadow-inner"
                  : "shadow-md hover:shadow-lg"
              }
              ${isHighlighted ? "ring-2 ring-blue-400 ring-opacity-60" : ""}
            `}
            style={getKeyStyle()}
          >
            {settings.showKeyLabels && keyObj.key !== "Space"
              ? keyObj.display
              : keyObj.key === "Space"
              ? "Space"
              : ""}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Key: {keyObj.key}</p>
          <p>Finger: {KEY_FINGER_MAP[keyObj.key] || "Unknown"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}; 