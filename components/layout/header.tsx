import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Settings, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Settings as SettingsType } from "@/lib/types";

interface HeaderProps {
  settings: SettingsType;
  onOpenSettings: () => void;
}

export const Header = ({ settings, onOpenSettings }: HeaderProps) => {
  return (
    <header className="relative mb-8">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 rounded-3xl" />

      {/* Main header container */}
      <div className="relative bg-background/95 backdrop-blur-sm border border-border/40 rounded-3xl p-8 shadow-sm">
        {/* Top navigation bar */}
        <nav className="flex items-center justify-between mb-8">
          {/* Left side - App branding */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/tt-tutor-logo.svg"
                alt="TT Tutor Logo"
                className="h-20 w-20 drop-shadow-sm"
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-foreground">
                TT Tutor
              </h2>
              <p className="text-xs text-muted-foreground">Typing Trainer</p>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            {/* Advanced mode indicator */}
            {settings.showAdvancedSettings && (
              <Badge
                variant="outline"
                className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
              >
                <Target className="h-3 w-3 mr-1" />
                {settings.testLevel}
              </Badge>
            )}

            {/* Settings button */}
            <Button
              onClick={onOpenSettings}
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0 hover:bg-accent/50 transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>

            {/* Theme toggle */}
            <ThemeToggle
              onThemeChange={() => {
                // This will be handled by the settings hook
              }}
            />
          </div>
        </nav>

        {/* Main hero section */}
        <div className="text-center space-y-6">
          {/* Main title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight">
              Master Your
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Typing Skills
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Improve your typing speed and accuracy with intelligent feedback,
              advanced tests, and detailed progress tracking.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>Real-time feedback</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Advanced test modes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Progress analytics</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
