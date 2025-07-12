"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

// Import types and constants
import { Settings as SettingsType, Stats } from "@/lib/types";
import { FINGER_COLORS, TEST_TEXTS } from "@/lib/constants";

// Import hooks
import { useAudioContext, useKeyboardInput } from "@/lib/hooks";

// Import components
import { SettingsModal } from "@/components/settings/settings-modal";
import { StatsDisplay } from "@/components/stats/stats-display";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PracticeMode } from "@/components/modes/practice-mode";
import { TestMode } from "@/components/modes/test-mode";
import { ThemeToggle } from "@/components/theme-toggle";
import { Settings, BarChart3, Eye, EyeOff } from "lucide-react";

const EnhancedTypingTrainer = () => {
  const { setTheme, theme } = useTheme();
  const [mode, setMode] = useState<"practice" | "test">("practice");
  const [settings, setSettings] = useState<SettingsType>({
    soundEnabled: true,
    keyboardTheme: "default",
    showFingerGuide: true,
    appTheme: "system",
    keyboardSize: 100,
    animationSpeed: 100,
    highlightIntensity: 50,
    soundVolume: 30,
    showWPMTarget: true,
    wpmTarget: 40,
    showKeyLabels: true,
    keyboardLayout: "qwerty",
    visualFeedback: "normal",
    showStatsCards: true,
  });

  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    accuracy: 0,
    errors: 0,
    timeElapsed: 0,
    charactersTyped: 0,
    correctChars: 0,
    incorrectChars: 0,
  });

  const [testText, setTestText] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState<Set<number>>(new Set());
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceStartTime, setPracticeStartTime] = useState<number | null>(
    null
  );
  const [isPracticeTyping, setIsPracticeTyping] = useState(false);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [testDuration, setTestDuration] = useState(10); // Default 10 seconds

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const practiceTextareaRef = useRef<HTMLTextAreaElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const practiceIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { playSound } = useAudioContext();

  const pressedKeys = useKeyboardInput(() => {
    if (settings.soundEnabled) {
      playSound(800, 0.1, settings.soundVolume / 100);
    }
  });

  const initializeTest = useCallback(() => {
    const randomText =
      TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)];
    setTestText(randomText);
    setCurrentInput("");
    setCurrentCharIndex(0);
    setIncorrectChars(new Set());
    setStartTime(null);
    setIsTyping(false);
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      timeElapsed: 0,
      charactersTyped: 0,
      correctChars: 0,
      incorrectChars: 0,
    });
  }, []);

  const retryTest = useCallback(() => {
    // Keep the same test text but reset everything else
    setCurrentInput("");
    setCurrentCharIndex(0);
    setIncorrectChars(new Set());
    setStartTime(null);
    setIsTyping(false);
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      timeElapsed: 0,
      charactersTyped: 0,
      correctChars: 0,
      incorrectChars: 0,
    });
  }, []);

  const initializeTimedTest = useCallback(() => {
    setTestText(""); // For timed tests, we'll generate text dynamically
    setCurrentInput("");
    setCurrentCharIndex(0);
    setIncorrectChars(new Set());
    setStartTime(null);
    setIsTyping(false);
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      timeElapsed: 0,
      charactersTyped: 0,
      correctChars: 0,
      incorrectChars: 0,
    });
  }, []);

  const resetPractice = useCallback(() => {
    setPracticeInput("");
    setPracticeStartTime(null);
    setIsPracticeTyping(false);
    setStats({
      wpm: 0,
      accuracy: 0,
      errors: 0,
      timeElapsed: 0,
      charactersTyped: 0,
      correctChars: 0,
      incorrectChars: 0,
    });
  }, []);

  const calculateStats = useCallback(() => {
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 1000;

    // Stop counting if test is complete (timed test time up or text completed)
    if (
      (isTimedTest && timeElapsed >= testDuration) ||
      (!isTyping && currentInput.length >= testText.length)
    ) {
      return;
    }

    const charactersTyped = currentInput.length;
    const correctChars = currentInput
      .split("")
      .filter((char, index) => char === testText[index]).length;
    const incorrectChars = charactersTyped - correctChars;
    const wpm = Math.round(correctChars / 5 / (timeElapsed / 60));

    // Fix accuracy calculation - should be 0% when no typing has occurred
    const accuracy =
      charactersTyped > 0
        ? Math.min(100, Math.round((correctChars / charactersTyped) * 100))
        : 0;

    setStats({
      wpm: wpm || 0,
      accuracy,
      errors: incorrectChars,
      timeElapsed: Math.round(timeElapsed),
      charactersTyped,
      correctChars,
      incorrectChars,
    });
  }, [currentInput, testText, startTime, isTimedTest, testDuration, isTyping]);

  const calculatePracticeStats = useCallback(() => {
    if (!practiceStartTime) return;

    const timeElapsed = (Date.now() - practiceStartTime) / 1000;
    const charactersTyped = practiceInput.length;
    const wpm = Math.round(charactersTyped / 5 / (timeElapsed / 60));
    const accuracy = charactersTyped > 0 ? 100 : 0; // In practice mode, all characters are considered correct

    setStats({
      wpm: wpm || 0,
      accuracy,
      errors: 0,
      timeElapsed: Math.round(timeElapsed),
      charactersTyped,
      correctChars: charactersTyped,
      incorrectChars: 0,
    });
  }, [practiceInput, practiceStartTime]);

  const handleInputChange = (value: string) => {
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleTimedInputChange = (value: string) => {
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setStartTime(Date.now());

      // Generate text for timed test if not already set
      if (!testText) {
        const randomText =
          TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)];
        setTestText(randomText);
      }
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

    // For timed tests, check if time is up
    if (isTimedTest && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      if (timeElapsed >= testDuration) {
        setIsTyping(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }
  };

  const handlePracticeInputChange = (value: string) => {
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
  };

  const handleSettingsChange = useCallback(
    (newSettings: SettingsType) => {
      setSettings(newSettings);
      // Update the actual theme when app theme setting changes
      if (newSettings.appTheme !== settings.appTheme) {
        setTheme(newSettings.appTheme);
      }
    },
    [settings.appTheme, setTheme]
  );

  const getKeyColor = (key: string): string => {
    const finger = FINGER_COLORS[key as keyof typeof FINGER_COLORS];
    return finger || "#6b7280";
  };

  const getCharacterClass = (index: number) => {
    if (index < currentInput.length) {
      return incorrectChars.has(index)
        ? "text-red-500 bg-red-500/10 dark:bg-red-500/20"
        : "text-green-600 bg-green-500/10 dark:bg-green-500/20";
    }
    if (index === currentCharIndex) {
      return "bg-primary/20 animate-pulse";
    }
    return "text-muted-foreground";
  };

  const getNextKeyToPress = () => {
    if (currentCharIndex < testText.length) {
      return testText[currentCharIndex];
    }
    return null;
  };

  useEffect(() => {
    if (mode === "test") {
      initializeTest();
    } else {
      resetPractice();
    }
  }, [initializeTest, resetPractice, mode]);

  useEffect(() => {
    if (isTyping) {
      intervalRef.current = setInterval(calculateStats, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTyping, calculateStats]);

  // Stop stats calculation when timed test ends
  useEffect(() => {
    if (isTimedTest && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      if (timeElapsed >= testDuration && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isTimedTest, startTime, testDuration]);

  useEffect(() => {
    if (isPracticeTyping) {
      practiceIntervalRef.current = setInterval(calculatePracticeStats, 100);
    } else if (practiceIntervalRef.current) {
      clearInterval(practiceIntervalRef.current);
    }

    return () => {
      if (practiceIntervalRef.current) {
        clearInterval(practiceIntervalRef.current);
      }
    };
  }, [isPracticeTyping, calculatePracticeStats]);

  useEffect(() => {
    if (mode === "test" && textareaRef.current) {
      textareaRef.current.focus();
    } else if (mode === "practice" && practiceTextareaRef.current) {
      practiceTextareaRef.current.focus();
    }
  }, [mode]);

  // Sync theme with settings on mount
  useEffect(() => {
    if (theme && theme !== settings.appTheme) {
      setSettings((prev) => ({
        ...prev,
        appTheme: theme as "light" | "dark" | "system",
      }));
    }
  }, [theme, settings.appTheme]);

  // Auto-switch keyboard theme based on app theme
  useEffect(() => {
    const currentTheme = theme || settings.appTheme;
    let targetKeyboardTheme = settings.keyboardTheme;

    // Only auto-switch if using default theme or if user manually selected minimalDark in light mode
    const shouldAutoSwitch =
      settings.keyboardTheme === "default" ||
      (settings.keyboardTheme === "minimalDark" && currentTheme === "light") ||
      (settings.keyboardTheme === "default" && currentTheme === "dark");

    if (shouldAutoSwitch) {
      if (currentTheme === "dark") {
        targetKeyboardTheme = "minimalDark";
      } else if (currentTheme === "light") {
        targetKeyboardTheme = "default";
      }
      // For "system" theme, we'll use the resolved theme
      else if (currentTheme === "system") {
        // Check if system prefers dark mode
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        targetKeyboardTheme = prefersDark ? "minimalDark" : "default";
      }
    }

    // Update keyboard theme if it changed
    if (targetKeyboardTheme !== settings.keyboardTheme) {
      setSettings((prev) => ({ ...prev, keyboardTheme: targetKeyboardTheme }));
    }
  }, [theme, settings.appTheme, settings.keyboardTheme]);

  // Listen for system theme preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (settings.appTheme === "system") {
        const prefersDark = mediaQuery.matches;
        const currentTheme = prefersDark ? "dark" : "light";

        // Use the same auto-switching logic
        const shouldAutoSwitch =
          settings.keyboardTheme === "default" ||
          (settings.keyboardTheme === "minimalDark" &&
            currentTheme === "light") ||
          (settings.keyboardTheme === "default" && currentTheme === "dark");

        if (shouldAutoSwitch) {
          const targetKeyboardTheme = prefersDark ? "minimalDark" : "default";
          setSettings((prev) => ({
            ...prev,
            keyboardTheme: targetKeyboardTheme,
          }));
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [settings.appTheme, settings.keyboardTheme]);

  const progress =
    mode === "test" ? (currentCharIndex / testText.length) * 100 : 0;
  const nextKey = mode === "test" ? getNextKeyToPress() : null;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center relative">
          <div className="absolute top-0 right-0 flex items-center gap-2">
            <Button
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  showStatsCards: !prev.showStatsCards,
                }))
              }
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
              title={
                settings.showStatsCards
                  ? "Hide Stats Cards"
                  : "Show Stats Cards"
              }
            >
              {settings.showStatsCards ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {settings.showStatsCards ? "Hide Stats" : "Show Stats"}
              </span>
            </Button>
            <Button
              onClick={() => setIsSettingsOpen(true)}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <ThemeToggle
              onThemeChange={(theme) => {
                setSettings((prev) => ({ ...prev, appTheme: theme }));
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 pt-12 sm:pt-0">
            <img
              src="/tt-tutor-logo.svg"
              alt="TT Tutor Logo"
              className="h-12 sm:h-16 w-auto"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                TT Tutor
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground">
                Master your typing skills with real-time feedback and analytics
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-card rounded-lg p-1 shadow-md border">
            <Button
              variant={mode === "practice" ? "default" : "ghost"}
              onClick={() => setMode("practice")}
              className="px-6"
            >
              Practice Mode
            </Button>
            <Button
              variant={mode === "test" ? "default" : "ghost"}
              onClick={() => setMode("test")}
              className="px-6"
            >
              Test Mode
            </Button>
          </div>
        </div>

        {/* Stats Display */}
        <StatsDisplay stats={stats} settings={settings} />

        {/* Progress */}
        {mode === "test" && (
          <Card>
            <CardContent className="p-6">
              <ProgressBar
                progress={progress}
                label="Test Progress"
                showPercentage={true}
              />
            </CardContent>
          </Card>
        )}

        {/* Practice Mode */}
        {mode === "practice" && (
          <PracticeMode
            practiceInput={practiceInput}
            onPracticeInputChange={handlePracticeInputChange}
            onReset={resetPractice}
            isPracticeTyping={isPracticeTyping}
            pressedKeys={pressedKeys}
            getKeyColor={getKeyColor}
            settings={settings}
            practiceTextareaRef={practiceTextareaRef}
          />
        )}

        {/* Test Mode */}
        {mode === "test" && (
          <TestMode
            testText={testText}
            currentInput={currentInput}
            onInputChange={
              isTimedTest ? handleTimedInputChange : handleInputChange
            }
            onReset={isTimedTest ? initializeTimedTest : initializeTest}
            onRetry={retryTest}
            nextKey={nextKey}
            getCharacterClass={getCharacterClass}
            stats={stats}
            textareaRef={textareaRef}
            isTimedTest={isTimedTest}
            testDuration={testDuration}
            onTimedTestChange={setIsTimedTest}
            onTestDurationChange={setTestDuration}
          />
        )}

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </div>
  );
};

export default EnhancedTypingTrainer;
