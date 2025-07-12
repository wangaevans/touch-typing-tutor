import { Zap, Target, XCircle, Timer } from "lucide-react";
import { StatCard } from "./stat-card";
import { Stats, Settings as SettingsType } from "@/lib/types";

interface StatsDisplayProps {
  stats: Stats;
  settings: SettingsType;
}

export const StatsDisplay = ({ stats, settings }: StatsDisplayProps) => {
  // Calculate trends based on previous values (simplified for demo)
  const getTrend = (
    current: number,
    target?: number
  ): "up" | "down" | "stable" => {
    if (!target) return "stable";
    if (current >= target) return "up";
    if (current >= target * 0.8) return "stable";
    return "down";
  };

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted/50 to-accent/50 rounded-2xl -z-10" />

      {/* TT Tutor branding */}
      <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-muted-foreground/60 font-medium">
        <img
          src="/tt-tutor-logo.svg"
          alt="TT Tutor Logo"
          className="h-4 w-auto opacity-60"
        />
        <span>Analytics</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-1">
        <div
          className="animate-fade-in-up h-full"
          style={{ animationDelay: "0ms" }}
        >
          <StatCard
            icon={Zap}
            label="WPM"
            value={stats.wpm}
            target={settings.showWPMTarget ? settings.wpmTarget : undefined}
            color="blue"
            trend={getTrend(
              stats.wpm,
              settings.showWPMTarget ? settings.wpmTarget : undefined
            )}
          />
        </div>

        <div
          className="animate-fade-in-up h-full"
          style={{ animationDelay: "100ms" }}
        >
          <StatCard
            icon={Target}
            label="Accuracy"
            value={stats.accuracy}
            target={95}
            color="green"
            trend={getTrend(stats.accuracy, 95)}
          />
        </div>

        <div
          className="animate-fade-in-up h-full"
          style={{ animationDelay: "200ms" }}
        >
          <StatCard
            icon={XCircle}
            label="Errors"
            value={stats.errors}
            color="red"
            trend={
              stats.errors === 0 ? "up" : stats.errors < 5 ? "stable" : "down"
            }
          />
        </div>

        <div
          className="animate-fade-in-up h-full"
          style={{ animationDelay: "300ms" }}
        >
          <StatCard
            icon={Timer}
            label="Time"
            value={stats.timeElapsed}
            color="purple"
            trend="stable"
          />
        </div>
      </div>
    </div>
  );
};
