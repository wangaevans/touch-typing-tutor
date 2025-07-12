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
  const theme =
    KEYBOARD_THEMES[settings.keyboardTheme as keyof typeof KEYBOARD_THEMES] ||
    KEYBOARD_THEMES.default;

  const getKeyStyle = () => {
    const baseStyle = {
      width: `${keyWidth}px`,
      height: `${baseWidth}px`,
      transition: "all 200ms ease",
    };

    // Only use finger color if theme is 'colorful'
    if (settings.keyboardTheme === "colorful") {
      const fingerColor = getKeyColor(keyObj.key);
      const lightColor = fingerColor + "80";
      return {
        ...baseStyle,
        background: `linear-gradient(135deg, ${fingerColor} 60%, ${lightColor} 100%)`,
        color: theme.keyText,
        boxShadow: isPressed
          ? `0 0 12px 2px ${fingerColor}99`
          : `0 0 8px 2px ${fingerColor}55`,
        border: `1.5px solid ${fingerColor}`,
        filter: isPressed ? "brightness(0.95)" : "none",
        transition: "all 200ms cubic-bezier(.4,2,.6,1)",
      };
    }

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

    if (settings.keyboardTheme === "themeAware") {
      return {
        ...baseStyle,
        backgroundColor: isPressed ? theme.pressedBg : theme.keyBg,
        color: isPressed ? theme.pressedText : theme.keyText,
        borderColor: theme.borderColor,
        boxShadow: isHighlighted
          ? `0 0 ${settings.highlightIntensity / 10}px rgba(59, 130, 246, 0.6)`
          : "none",
      };
    }

    // For all other themes (default, minimal, minimalDark, neon, etc.)
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
