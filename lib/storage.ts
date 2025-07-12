import { Settings, StatsHistory } from "./types";

// Default settings
export const DEFAULT_SETTINGS: Settings = {
  soundEnabled: false,
  keyboardTheme: "colorful",
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
  isTimedTest: true,
  testDuration: 30,
  strictMode: false,
  // Advanced test settings
  testLevel: "beginner",
  testType: "speed",
  testLength: "medium",
  showAdvancedSettings: false,
};

// Load settings from localStorage
export const loadSettings = (): Settings => {
  if (typeof window === "undefined") {
    // Return default settings during SSR to prevent hydration mismatch
    return DEFAULT_SETTINGS;
  }

  try {
    const saved = localStorage.getItem("tt-tutor-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to handle any missing properties
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
  }

  return DEFAULT_SETTINGS;
};

// Save settings to localStorage
export const saveSettings = (settings: Settings) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("tt-tutor-settings", JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

// Load stats history from localStorage
export const loadStatsHistory = (): StatsHistory[] => {
  if (typeof window === "undefined") {
    // Return empty array during SSR to prevent hydration mismatch
    return [];
  }

  try {
    const saved = localStorage.getItem("tt-tutor-stats-history");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load stats history:", error);
  }

  return [];
};

// Save stats history to localStorage
export const saveStatsHistory = (history: StatsHistory[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("tt-tutor-stats-history", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save stats history:", error);
  }
};
