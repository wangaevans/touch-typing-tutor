// Types
export interface KeyboardKey {
  key: string;
  display: string;
  width?: number;
}

export interface Settings {
  soundEnabled: boolean;
  keyboardTheme: string; // Allow any theme from the keyboard themes
  showFingerGuide: boolean;
  appTheme: "light" | "dark" | "system";
  keyboardSize: number;
  animationSpeed: number;
  highlightIntensity: number;
  soundVolume: number;
  showWPMTarget: boolean;
  wpmTarget: number;
  showKeyLabels: boolean;
  keyboardLayout: "qwerty" | "dvorak" | "colemak";
  visualFeedback: "subtle" | "normal" | "intense";
  showStatsCards: boolean;
  isTimedTest: boolean;
  testDuration: number;
  strictMode: boolean;
  // Advanced test settings
  testLevel: "beginner" | "intermediate" | "advanced" | "expert";
  testType:
    | "speed"
    | "accuracy"
    | "endurance"
    | "programming"
    | "numbers"
    | "punctuation";
  testLength: "short" | "medium" | "long";
  showAdvancedSettings: boolean;
}

export interface Stats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  charactersTyped: number;
  correctChars: number;
  incorrectChars: number;
}

export interface StatsHistory {
  id: string;
  timestamp: number;
  stats: Stats;
  mode: "practice" | "test";
}
