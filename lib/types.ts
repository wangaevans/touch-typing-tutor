// Types
export interface KeyboardKey {
  key: string;
  display: string;
  width?: number;
}

export interface Settings {
  soundEnabled: boolean;
  keyboardTheme:
    | "default"
    | "colorful"
    | "minimal"
    | "neon"
    | "retro"
    | "gradient";
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
