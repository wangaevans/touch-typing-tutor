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
  });

  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    accuracy: 100,
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
      accuracy: 100,
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
      accuracy: 100,
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
    const charactersTyped = currentInput.length;
    const correctChars = currentInput
      .split("")
      .filter((char, index) => char === testText[index]).length;
    const incorrectChars = charactersTyped - correctChars;
    const wpm = Math.round(correctChars / 5 / (timeElapsed / 60));
    const accuracy =
      charactersTyped > 0
        ? Math.round((correctChars / charactersTyped) * 100)
        : 100;

    setStats({
      wpm: wpm || 0,
      accuracy,
      errors: incorrectChars,
      timeElapsed: Math.round(timeElapsed),
      charactersTyped,
      correctChars,
      incorrectChars,
    });
  }, [currentInput, testText, startTime]);

  const calculatePracticeStats = useCallback(() => {
    if (!practiceStartTime) return;

    const timeElapsed = (Date.now() - practiceStartTime) / 1000;
    const charactersTyped = practiceInput.length;
    const wpm = Math.round(charactersTyped / 5 / (timeElapsed / 60));
    const accuracy = 100; // In practice mode, all characters are considered correct

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

    // Complete test
    if (value === testText) {
      setIsTyping(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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
          <div className="absolute top-0 right-0">
            <ThemeToggle
              onThemeChange={(theme) => {
                setSettings((prev) => ({ ...prev, appTheme: theme }));
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/tt-tutor-logo.svg"
              alt="TT Tutor Logo"
              className="h-16 w-auto"
            />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                TT Tutor
              </h1>
              <p className="text-lg text-muted-foreground">
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
              <div className="relative">
                <div className="absolute top-0 right-0 flex items-center gap-1 text-xs text-muted-foreground/60 font-medium">
                  <img
                    src="/tt-tutor-logo.svg"
                    alt="TT Tutor Logo"
                    className="h-3 w-auto opacity-60"
                  />
                  <span>TT Tutor</span>
                </div>
                <ProgressBar
                  progress={progress}
                  label="Test Progress"
                  showPercentage={true}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practice Mode */}
        {mode === "practice" && (
          <PracticeMode
            practiceInput={practiceInput}
            onPracticeInputChange={handlePracticeInputChange}
            onReset={resetPractice}
            onOpenSettings={() => setIsSettingsOpen(true)}
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
            onInputChange={handleInputChange}
            onReset={initializeTest}
            onOpenSettings={() => setIsSettingsOpen(true)}
            nextKey={nextKey}
            getCharacterClass={getCharacterClass}
            stats={stats}
            textareaRef={textareaRef}
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
