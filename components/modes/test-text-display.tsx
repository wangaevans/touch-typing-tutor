import React from "react";

interface TestTextDisplayProps {
  testText: string;
  getCharacterClass: (index: number) => string;
}

export const TestTextDisplay = ({
  testText,
  getCharacterClass,
}: TestTextDisplayProps) => {
  return (
    <div className="bg-muted/30 rounded-xl p-6 border border-border/50 font-mono text-lg leading-8 min-h-[120px]">
      <div className="flex flex-wrap">
        {testText.split("").map((char, index) => (
          <span
            key={index}
            className={`${getCharacterClass(
              index
            )} px-0.5 py-0.5 rounded-sm transition-all duration-150`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};
