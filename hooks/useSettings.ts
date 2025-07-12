import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Settings } from "../lib/types";
import { loadSettings, saveSettings } from "../lib/storage";

export const useSettings = () => {
  const { setTheme, theme } = useTheme();
  const [settings, setSettingsState] = useState<Settings>(loadSettings);
  const [mounted, setMounted] = useState(false);

  // Ensure we only run client-side logic after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const setSettings = useCallback(
    (newSettings: Settings | ((prev: Settings) => Settings)) => {
      const updatedSettings =
        typeof newSettings === "function" ? newSettings(settings) : newSettings;

      setSettingsState(updatedSettings);
      saveSettings(updatedSettings);

      // Update the actual theme when app theme setting changes
      if (updatedSettings.appTheme !== settings.appTheme) {
        setTheme(updatedSettings.appTheme);
      }
    },
    [settings, setTheme]
  );

  // Sync theme with settings on mount (client-side only)
  useEffect(() => {
    if (mounted && theme && theme !== settings.appTheme) {
      setSettingsState((prev) => ({
        ...prev,
        appTheme: theme as "light" | "dark" | "system",
      }));
    }
  }, [mounted, theme, settings.appTheme]);

  // Auto-switch keyboard theme based on app theme (client-side only)
  useEffect(() => {
    if (!mounted) return;

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
      setSettingsState((prev) => ({
        ...prev,
        keyboardTheme: targetKeyboardTheme,
      }));
    }
  }, [mounted, theme, settings.appTheme, settings.keyboardTheme]);

  // Listen for system theme preference changes (client-side only)
  useEffect(() => {
    if (!mounted) return;

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
          setSettingsState((prev) => ({
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
  }, [mounted, settings.appTheme, settings.keyboardTheme]);

  return {
    settings,
    setSettings,
    mounted,
  };
};
