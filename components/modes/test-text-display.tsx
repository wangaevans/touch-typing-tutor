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
  );
};
