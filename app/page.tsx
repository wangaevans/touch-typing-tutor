"use client";
import { useState, useEffect, useCallback } from "react";

// Import hooks
import { useAudioContext, useKeyboardInput } from "@/lib/hooks";
import { useSettings } from "@/hooks/useSettings";
import { useStats } from "@/hooks/useStats";
import { useTestMode } from "@/hooks/useTestMode";
import { usePracticeMode } from "@/hooks/usePracticeMode";

// Import components
import { SettingsModal } from "@/components/settings/settings-modal";
import { PracticeMode } from "@/components/modes/practice-mode";
import { TestMode } from "@/components/modes/test-mode";
import { StatsPage } from "@/components/stats/stats-page";
import { Header } from "@/components/layout/header";
import { ModeSelector } from "@/components/layout/mode-selector";

// Import constants
import { FINGER_COLORS } from "@/lib/constants";
import { Settings as SettingsType } from "@/lib/types";

const EnhancedTypingTrainer = () => {
  const [mode, setMode] = useState<"practice" | "test" | "stats">("practice");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Custom hooks
  const { settings, setSettings, mounted } = useSettings();
  const {
    stats,
    statsHistory,
    resetStats,
    calculateStats,
    calculatePracticeStats,
    calculateFinalTestStats,
    saveCurrentStatsToHistory,
    startStatsInterval,
    stopStatsInterval,
  } = useStats();

  const {
    testText,
    currentInput,
    isTyping,
    startTime,
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
    setIsTimedTest,
    setTestDuration,
  } = useTestMode(settings);

  const {
    practiceInput,
    practiceStartTime,
    isPracticeTyping,
    practiceTextareaRef,
    resetPractice,
    handlePracticeInputChange,
  } = usePracticeMode();

  const { playSound } = useAudioContext();

  const pressedKeys = useKeyboardInput(() => {
    if (settings.soundEnabled) {
      playSound(800, 0.1, settings.soundVolume / 100);
    }
  });

  const getKeyColor = useCallback((key: string): string => {
    const finger = FINGER_COLORS[key as keyof typeof FINGER_COLORS];
    return finger || "#6b7280";
  }, []);

  const handleSettingsChange = useCallback(
    (newSettings: SettingsType) => {
      setSettings(newSettings);
    },
    [setSettings]
  );

  const handleTimedTestChange = useCallback(
    (isTimed: boolean) => {
      setIsTimedTest(isTimed);
      setSettings((prev: SettingsType) => ({ ...prev, isTimedTest: isTimed }));
    },
    [setIsTimedTest, setSettings]
  );

  const handleTestDurationChange = useCallback(
    (duration: number) => {
      setTestDuration(duration);
      setSettings((prev: SettingsType) => ({
        ...prev,
        testDuration: duration,
      }));
    },
    [setTestDuration, setSettings]
  );

  const handleOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  // Handle practice reset with stats saving
  const handlePracticeReset = useCallback(() => {
    saveCurrentStatsToHistory("practice");
    resetPractice();
    resetStats();
  }, [saveCurrentStatsToHistory, resetPractice, resetStats]);

  // Handle test input changes
  const handleTestInputChange = useCallback(
    (value: string) => {
      if (isTimedTest) {
        handleTimedInputChange(value, () =>
          calculateFinalTestStats(currentInput, testText, startTime)
        );
      } else {
        handleInputChange(value, () =>
          calculateFinalTestStats(currentInput, testText, startTime)
        );
      }
    },
    [
      isTimedTest,
      handleTimedInputChange,
      handleInputChange,
      calculateFinalTestStats,
      currentInput,
      testText,
      startTime,
    ]
  );

  // Handle practice input changes
  const handlePracticeInputChangeWithStats = useCallback(
    (value: string) => {
      handlePracticeInputChange(value);
    },
    [handlePracticeInputChange]
  );

  // Stats calculation effects
  useEffect(() => {
    if (mode === "test") {
      const calculateTestStats = () => {
        calculateStats(
          currentInput,
          testText,
          startTime,
          isTimedTest,
          testDuration,
          isTyping,
          isTestComplete
        );
      };

      startStatsInterval(isTyping, isTestComplete, "test", calculateTestStats);
    } else if (mode === "practice") {
      const calculatePracticeStatsFn = () => {
        calculatePracticeStats(practiceInput, practiceStartTime);
      };

      startStatsInterval(
        isPracticeTyping,
        false,
        "practice",
        calculatePracticeStatsFn
      );
    }

    return () => {
      stopStatsInterval();
    };
  }, [
    mode,
    isTyping,
    isTestComplete,
    isPracticeTyping,
    currentInput,
    testText,
    startTime,
    isTimedTest,
    testDuration,
    practiceInput,
    practiceStartTime,
    calculateStats,
    calculatePracticeStats,
    startStatsInterval,
    stopStatsInterval,
  ]);

  // Stop stats calculation when timed test ends
  useEffect(() => {
    if (isTimedTest && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      if (timeElapsed >= testDuration) {
        stopStatsInterval();
      }
    }
  }, [isTimedTest, startTime, testDuration, stopStatsInterval]);

  // Initialize test when mode changes
  useEffect(() => {
    if (mode === "test") {
      if (isTimedTest) {
        initializeTimedTest();
      } else {
        initializeTest();
      }
    } else {
      handlePracticeReset();
    }
  }, [
    mode,
    isTimedTest,
    initializeTest,
    initializeTimedTest,
    handlePracticeReset,
  ]);

  // Focus management
  useEffect(() => {
    if (mode === "test" && textareaRef.current) {
      textareaRef.current.focus();
    } else if (mode === "practice" && practiceTextareaRef.current) {
      practiceTextareaRef.current.focus();
    }
  }, [mode]);

  const nextKey = mode === "test" ? getNextKeyToPress() : null;

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center">
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
                  Master your typing skills with real-time feedback and
                  analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header settings={settings} onOpenSettings={handleOpenSettings} />

        <ModeSelector mode={mode} onModeChange={setMode} />

        {mode === "practice" && (
          <PracticeMode
            practiceInput={practiceInput}
            onPracticeInputChange={handlePracticeInputChangeWithStats}
            onReset={handlePracticeReset}
            isPracticeTyping={isPracticeTyping}
            pressedKeys={pressedKeys}
            getKeyColor={getKeyColor}
            settings={settings}
            practiceTextareaRef={practiceTextareaRef}
          />
        )}

        {mode === "test" && (
          <TestMode
            testText={testText}
            currentInput={currentInput}
            onInputChange={handleTestInputChange}
            onReset={isTimedTest ? initializeTimedTest : initializeTest}
            onRetry={retryTest}
            nextKey={nextKey}
            getCharacterClass={getCharacterClass}
            stats={stats}
            textareaRef={textareaRef}
            isTimedTest={isTimedTest}
            testDuration={testDuration}
            onTimedTestChange={handleTimedTestChange}
            onTestDurationChange={handleTestDurationChange}
            isTestComplete={isTestComplete}
            strictMode={settings.strictMode}
            settings={settings}
          />
        )}

        {mode === "stats" && (
          <StatsPage
            stats={stats}
            settings={{
              wpmTarget: settings.wpmTarget,
              showWPMTarget: settings.showWPMTarget,
            }}
            statsHistory={statsHistory}
          />
        )}

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
