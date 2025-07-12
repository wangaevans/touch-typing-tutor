import { useState, useCallback, useRef } from "react";

export const usePracticeMode = () => {
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceStartTime, setPracticeStartTime] = useState<number | null>(
    null
  );
  const [isPracticeTyping, setIsPracticeTyping] = useState(false);

  const practiceTextareaRef = useRef<HTMLTextAreaElement>(null);

  const resetPractice = useCallback(() => {
    setPracticeInput("");
    setPracticeStartTime(null);
    setIsPracticeTyping(false);
  }, []);

  const handlePracticeInputChange = useCallback(
    (value: string) => {
      if (!isPracticeTyping && value.length > 0) {
        setIsPracticeTyping(true);
        setPracticeStartTime(Date.now());
      }

      setPracticeInput(value);

      // Complete practice session (optional - could be endless)
      if (value.length > 0 && !isPracticeTyping) {
        setIsPracticeTyping(true);
        setPracticeStartTime(Date.now());
      }
    },
    [isPracticeTyping]
  );

  return {
    practiceInput,
    practiceStartTime,
    isPracticeTyping,
    practiceTextareaRef,
    resetPractice,
    handlePracticeInputChange,
  };
};
