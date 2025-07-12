import { KeyboardKey } from "./types";
import { ENHANCED_KEYBOARD_THEMES } from "./keyboard-themes";

// Constants
export const FINGER_COLORS = {
  leftPinky: "#8e44ad", // Royal Purple
  leftRing: "#f39c12", // Vibrant Gold
  leftMiddle: "#e74c3c", // Vivid Red
  leftIndex: "#16a085", // Deep Teal
  leftThumb: "#34495e", // Slate Blue-Gray
  rightThumb: "#34495e", // Slate Blue-Gray
  rightIndex: "#27ae60", // Emerald Green
  rightMiddle: "#2980b9", // Strong Blue
  rightRing: "#f1c40f", // Bright Yellow
  rightPinky: "#9b59b6", // Amethyst Purple
};

export const KEYBOARD_THEMES = ENHANCED_KEYBOARD_THEMES;

export const KEY_FINGER_MAP: Record<string, keyof typeof FINGER_COLORS> = {
  "`": "leftPinky",
  "1": "leftPinky",
  "2": "leftRing",
  "3": "leftMiddle",
  "4": "leftIndex",
  "5": "leftIndex",
  Tab: "leftPinky",
  q: "leftPinky",
  w: "leftRing",
  e: "leftMiddle",
  r: "leftIndex",
  t: "leftIndex",
  CapsLock: "leftPinky",
  a: "leftPinky",
  s: "leftRing",
  d: "leftMiddle",
  f: "leftIndex",
  g: "leftIndex",
  Shift: "leftPinky",
  z: "leftPinky",
  x: "leftRing",
  c: "leftMiddle",
  v: "leftIndex",
  b: "leftIndex",
  Ctrl: "leftPinky",
  Win: "leftThumb",
  Alt: "leftThumb",
  "6": "rightIndex",
  "7": "rightIndex",
  "8": "rightMiddle",
  "9": "rightRing",
  "0": "rightPinky",
  "-": "rightPinky",
  "=": "rightPinky",
  Backspace: "rightPinky",
  y: "rightIndex",
  u: "rightIndex",
  i: "rightMiddle",
  o: "rightRing",
  p: "rightPinky",
  "[": "rightPinky",
  "]": "rightPinky",
  "\\": "rightPinky",
  h: "rightIndex",
  j: "rightIndex",
  k: "rightMiddle",
  l: "rightRing",
  ";": "rightPinky",
  "'": "rightPinky",
  Enter: "rightPinky",
  n: "rightIndex",
  m: "rightIndex",
  ",": "rightMiddle",
  ".": "rightRing",
  "/": "rightPinky",
  RShift: "rightPinky",
  RAlt: "rightThumb",
  Menu: "rightThumb",
  RCtrl: "rightPinky",
  Space: "rightThumb",
  " ": "rightThumb",
};

export const KEYBOARD_LAYOUT: KeyboardKey[][] = [
  [
    { key: "", display: "~" },
    { key: "1", display: "1!" },
    { key: "2", display: "2@" },
    { key: "3", display: "3#" },
    { key: "4", display: "4$" },
    { key: "5", display: "5%" },
    { key: "6", display: "6^" },
    { key: "7", display: "7&" },
    { key: "8", display: "8*" },
    { key: "9", display: "9(" },
    { key: "0", display: "0)" },
    { key: "-", display: "-" },
    { key: "=", display: "=+" },
    { key: "Backspace", display: "Backspace", width: 2 },
  ],
  [
    { key: "Tab", display: "Tab", width: 1.5 },
    { key: "q", display: "Q" },
    { key: "w", display: "W" },
    { key: "e", display: "E" },
    { key: "r", display: "R" },
    { key: "t", display: "T" },
    { key: "y", display: "Y" },
    { key: "u", display: "U" },
    { key: "i", display: "I" },
    { key: "o", display: "O" },
    { key: "p", display: "P" },
    { key: "[", display: "[{" },
    { key: "]", display: "]}" },
    { key: "\\", display: "\\|", width: 1.5 },
  ],
  [
    { key: "CapsLock", display: "Caps Lock", width: 1.75 },
    { key: "a", display: "A" },
    { key: "s", display: "S" },
    { key: "d", display: "D" },
    { key: "f", display: "F" },
    { key: "g", display: "G" },
    { key: "h", display: "H" },
    { key: "j", display: "J" },
    { key: "k", display: "K" },
    { key: "l", display: "L" },
    { key: ";", display: ";:" },
    { key: "'", display: "'\"" },
    { key: "Enter", display: "Enter", width: 2.25 },
  ],
  [
    { key: "Shift", display: "Shift", width: 2.25 },
    { key: "z", display: "Z" },
    { key: "x", display: "X" },
    { key: "c", display: "C" },
    { key: "v", display: "V" },
    { key: "b", display: "B" },
    { key: "n", display: "N" },
    { key: "m", display: "M" },
    { key: ",", display: ",<" },
    { key: ".", display: ".>" },
    { key: "/", display: "/?" },
    { key: "RShift", display: "Shift", width: 2.75 },
  ],
  [
    { key: "Ctrl", display: "Ctrl", width: 1.25 },
    { key: "Win", display: "Win", width: 1.25 },
    { key: "Alt", display: "Alt", width: 1.25 },
    { key: "Space", display: "", width: 6.25 },
    { key: "RAlt", display: "Alt", width: 1.25 },
    { key: "Menu", display: "Menu", width: 1.25 },
    { key: "RCtrl", display: "Ctrl", width: 1.25 },
  ],
];

export const TEST_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  "To be or not to be, that is the question. Whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
  "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell.",
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
  "All work and no play makes Jack a dull boy. Practice makes perfect. The early bird catches the worm.",
];
