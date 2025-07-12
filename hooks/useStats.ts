import { useState, useEffect, useRef, useCallback } from "react";
import { Stats, StatsHistory } from "../lib/types";
import { loadStatsHistory, saveStatsHistory } from "../lib/storage";

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    accuracy: 0,
    errors: 0,
    timeElapsed: 0,
    charactersTyped: 0,
    correctChars: 0,
    incorrectChars: 0,
  });

  const [statsHistory, setStatsHistory] =
    useState<StatsHistory[]>(loadStatsHistory);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const practiceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetStats = useCallback(() => {
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

  const calculateStats = useCallback(
    (
      currentInput: string,
      testText: string,
      startTime: number | null,
      isTimedTest: boolean,
      testDuration: number,
      isTyping: boolean,
      isTestComplete: boolean
    ) => {
      if (!startTime || isTestComplete) return;

      const timeElapsed = (Date.now() - startTime) / 1000;

      // Stop counting if test is complete (timed test time up or text completed)
      if (
        (isTimedTest && timeElapsed >= testDuration) ||
        (!isTyping && currentInput.length >= testText.length)
      ) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
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

      const newStats = {
        wpm: wpm || 0,
        accuracy,
        errors: incorrectChars,
        timeElapsed: Math.round(timeElapsed),
        charactersTyped,
        correctChars,
        incorrectChars,
      };

      // Only update stats if they've actually changed to prevent unnecessary re-renders
      setStats((prevStats) => {
        if (
          prevStats.wpm !== newStats.wpm ||
          prevStats.accuracy !== newStats.accuracy ||
          prevStats.errors !== newStats.errors ||
          prevStats.timeElapsed !== newStats.timeElapsed ||
          prevStats.charactersTyped !== newStats.charactersTyped ||
          prevStats.correctChars !== newStats.correctChars ||
          prevStats.incorrectChars !== newStats.incorrectChars
        ) {
          return newStats;
        }
        return prevStats;
      });
    },
    []
  );

  const calculatePracticeStats = useCallback(
    (practiceInput: string, practiceStartTime: number | null) => {
      if (!practiceStartTime) return;

      const timeElapsed = (Date.now() - practiceStartTime) / 1000;
      const charactersTyped = practiceInput.length;
      const wpm = Math.round(charactersTyped / 5 / (timeElapsed / 60));
      const accuracy = charactersTyped > 0 ? 100 : 0; // In practice mode, all characters are considered correct

      const newStats = {
        wpm: wpm || 0,
        accuracy,
        errors: 0,
        timeElapsed: Math.round(timeElapsed),
        charactersTyped,
        correctChars: charactersTyped,
        incorrectChars: 0,
      };

      // Only update stats if they've actually changed to prevent unnecessary re-renders
      setStats((prevStats) => {
        if (
          prevStats.wpm !== newStats.wpm ||
          prevStats.accuracy !== newStats.accuracy ||
          prevStats.timeElapsed !== newStats.timeElapsed ||
          prevStats.charactersTyped !== newStats.charactersTyped ||
          prevStats.correctChars !== newStats.correctChars
        ) {
          return newStats;
        }
        return prevStats;
      });
    },
    []
  );

  const calculateFinalTestStats = useCallback(
    (currentInput: string, testText: string, startTime: number | null) => {
      if (!startTime) return;

      const timeElapsed = (Date.now() - startTime) / 1000;
      const charactersTyped = currentInput.length;
      const correctChars = currentInput
        .split("")
        .filter((char, index) => char === testText[index]).length;
      const incorrectChars = charactersTyped - correctChars;

      // Calculate WPM based on total characters typed (not just correct ones)
      const wpm = Math.round(charactersTyped / 5 / (timeElapsed / 60));

      // Fix accuracy calculation - should be 0% when no typing has occurred
      const accuracy =
        charactersTyped > 0
          ? Math.min(100, Math.round((correctChars / charactersTyped) * 100))
          : 0;

      const finalStats = {
        wpm: wpm || 0,
        accuracy,
        errors: incorrectChars,
        timeElapsed: Math.round(timeElapsed),
        charactersTyped,
        correctChars,
        incorrectChars,
      };

      console.log("Final Test Stats:", {
        timeElapsed,
        charactersTyped,
        correctChars,
        incorrectChars,
        wpm,
        accuracy,
      });

      setStats(finalStats);
    },
    []
  );

  const saveCurrentStatsToHistory = useCallback((mode: "practice" | "test") => {
    setStats((currentStats) => {
      if (currentStats.charactersTyped > 0 && currentStats.timeElapsed > 0) {
        const newHistoryEntry: StatsHistory = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          stats: { ...currentStats },
          mode,
        };

        setStatsHistory((prev) => {
          const newHistory = [newHistoryEntry, ...prev.slice(0, 49)]; // Keep last 50 entries
          saveStatsHistory(newHistory);
          return newHistory;
        });
      }

      return {
        wpm: 0,
        accuracy: 0,
        errors: 0,
        timeElapsed: 0,
        charactersTyped: 0,
        correctChars: 0,
        incorrectChars: 0,
      };
    });
  }, []);

  const startStatsInterval = useCallback(
    (
      isTyping: boolean,
      isTestComplete: boolean,
      mode: "practice" | "test",
      calculateFn: () => void
    ) => {
      if (isTyping && !isTestComplete && mode === "test") {
        intervalRef.current = setInterval(calculateFn, 250);
      } else if (isTyping && mode === "practice") {
        practiceIntervalRef.current = setInterval(calculateFn, 250);
      }
    },
    []
  );

  const stopStatsInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (practiceIntervalRef.current) {
      clearInterval(practiceIntervalRef.current);
      practiceIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopStatsInterval();
    };
  }, [stopStatsInterval]);

  return {
    stats,
    statsHistory,
    resetStats,
    calculateStats,
    calculatePracticeStats,
    calculateFinalTestStats,
    saveCurrentStatsToHistory,
    startStatsInterval,
    stopStatsInterval,
  };
};
