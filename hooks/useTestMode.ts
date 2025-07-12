import { useState, useCallback, useRef } from "react";
import { TEST_TEXTS } from "../lib/constants";
import { getRandomTestContent } from "../lib/advanced-tests";

export const useTestMode = (settings: any) => {
  const [testText, setTestText] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState<Set<number>>(new Set());
  const [isTimedTest, setIsTimedTest] = useState(settings.isTimedTest);
  const [testDuration, setTestDuration] = useState(settings.testDuration);
  const [isTestComplete, setIsTestComplete] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const initializeTest = useCallback(() => {
    let randomText;

    // Use advanced test content if advanced settings are enabled
    if (settings.showAdvancedSettings) {
      randomText = getRandomTestContent(
        settings.testLevel,
        settings.testType,
        settings.testLength
      );
    } else {
      // Fall back to basic test texts
      randomText = TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)];
    }

    setTestText(randomText);
    setCurrentInput("");
    setCurrentCharIndex(0);
    setIncorrectChars(new Set());
    setStartTime(null);
    setIsTyping(false);
    setIsTestComplete(false);
  }, [
    settings.showAdvancedSettings,
    settings.testLevel,
    settings.testType,
    settings.testLength,
  ]);

  const retryTest = useCallback(() => {
    // Keep the same test text but reset everything else
    setCurrentInput("");
    setCurrentCharIndex(0);
    setIncorrectChars(new Set());
    setStartTime(null);
    setIsTyping(false);
    setIsTestComplete(false);
  }, []);

  const initializeTimedTest = useCallback(() => {
    let randomText;

    // Use advanced test content if advanced settings are enabled
    if (settings.showAdvancedSettings) {
      randomText = getRandomTestContent(
        settings.testLevel,
        settings.testType,
        settings.testLength
      );
    } else {
      // Fall back to basic test texts
      randomText = TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)];
    }

    setTestText(randomText);
    setCurrentInput("");
    setCurrentCharIndex(0);
    setIncorrectChars(new Set());
    setStartTime(null);
    setIsTyping(false);
    setIsTestComplete(false);
  }, [
    settings.showAdvancedSettings,
    settings.testLevel,
    settings.testType,
    settings.testLength,
  ]);

  const validateInput = useCallback(
    (value: string) => {
      if (!settings.strictMode) return true;

      const currentLength = currentInput.length;
      const newLength = value.length;

      // If user is trying to add characters
      if (newLength > currentLength) {
        const newChar = value[newLength - 1];
        const expectedChar = testText[newLength - 1];

        // If the new character doesn't match, don't allow it
        if (newChar !== expectedChar) {
          return false;
        }
      }
      // If user is trying to delete characters, allow it
      else if (newLength < currentLength) {
        return true;
      }
      // If user is trying to replace characters, check if the replacement is correct
      else if (newLength === currentLength) {
        // This handles character replacement (like backspace + new char)
        for (let i = 0; i < newLength; i++) {
          if (value[i] !== testText[i]) {
            return false;
          }
        }
      }

      return true;
    },
    [currentInput.length, testText, settings.strictMode]
  );

  const handleInputChange = useCallback(
    (value: string, calculateFinalStats: () => void) => {
      if (!validateInput(value)) return;

      if (!isTyping && value.length > 0) {
        setIsTyping(true);
        setStartTime(Date.now());
      }

      setCurrentInput(value);
      setCurrentCharIndex(value.length);

      // Track incorrect characters
      const newIncorrectChars = new Set<number>();
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== testText[i]) {
          newIncorrectChars.add(i);
        }
      }
      setIncorrectChars(newIncorrectChars);

      // Complete test - check if user has typed the complete test text
      if (value.length >= testText.length) {
        setIsTyping(false);
        setIsTestComplete(true);
        // Calculate final stats
        setTimeout(() => calculateFinalStats(), 0);
      }
    },
    [isTyping, testText, validateInput]
  );

  const handleTimedInputChange = useCallback(
    (value: string, calculateFinalStats: () => void) => {
      if (!validateInput(value)) return;

      if (!isTyping && value.length > 0) {
        setIsTyping(true);
        setStartTime(Date.now());
      }

      setCurrentInput(value);
      setCurrentCharIndex(value.length);

      // Track incorrect characters
      const newIncorrectChars = new Set<number>();
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== testText[i]) {
          newIncorrectChars.add(i);
        }
      }
      setIncorrectChars(newIncorrectChars);

      // End test if all characters are typed (even if wrong)
      if (value.length >= testText.length) {
        setIsTyping(false);
        setIsTestComplete(true);
        // Calculate final stats
        setTimeout(() => calculateFinalStats(), 0);
        return;
      }

      // For timed tests, check if time is up
      if (isTimedTest && startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000;
        if (timeElapsed >= testDuration) {
          setIsTyping(false);
          setIsTestComplete(true);
          // Calculate final stats
          setTimeout(() => calculateFinalStats(), 0);
        }
      }
    },
    [isTyping, testText, validateInput, isTimedTest, startTime, testDuration]
  );

  const getCharacterClass = useCallback(
    (index: number) => {
      if (index < currentInput.length) {
        return incorrectChars.has(index)
          ? "text-red-500 bg-red-500/10 dark:bg-red-500/20"
          : "text-green-600 bg-green-500/10 dark:bg-green-500/20";
      }
      if (index === currentCharIndex) {
        return "bg-primary/20 animate-pulse";
      }
      return "text-muted-foreground";
    },
    [currentInput.length, incorrectChars, currentCharIndex]
  );

  const getNextKeyToPress = useCallback(() => {
    if (currentCharIndex < testText.length) {
      return testText[currentCharIndex];
    }
    return null;
  }, [currentCharIndex, testText]);

  const getProgress = useCallback(() => {
    return (currentCharIndex / testText.length) * 100;
  }, [currentCharIndex, testText.length]);

  return {
    testText,
    currentInput,
    isTyping,
    startTime,
    currentCharIndex,
    incorrectChars,
    isTimedTest,
    testDuration,
    isTestComplete,
    textareaRef,
    initializeTest,
    retryTest,
    initializeTimedTest,
    handleInputChange,
    handleTimedInputChange,
    getCharacterClass,
    getNextKeyToPress,
    getProgress,
    setIsTimedTest,
    setTestDuration,
  };
};
