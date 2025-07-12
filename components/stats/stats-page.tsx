import React from "react";
import { TrendingDown, TrendingUp, Minus, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Stats, StatsHistory } from "@/lib/types";

interface StatsPageProps {
  stats: Stats;
  settings: {
    wpmTarget: number;
    showWPMTarget: boolean;
  };
  statsHistory: StatsHistory[];
}

export const StatsPage = ({ settings, statsHistory }: StatsPageProps) => {
  const getTrend = (
    current: number,
    target: number
  ): "up" | "down" | "stable" => {
    if (current >= target) return "up";
    if (current >= target * 0.8) return "stable";
    return "down";
  };

  const getAccuracyTarget = () => 95; // Fixed accuracy target

  // Calculate average stats from history
  const averageStats =
    statsHistory.length > 0
      ? {
          wpm: Math.round(
            statsHistory.reduce((sum, entry) => sum + entry.stats.wpm, 0) /
              statsHistory.length
          ),
          accuracy: Math.round(
            statsHistory.reduce((sum, entry) => sum + entry.stats.accuracy, 0) /
              statsHistory.length
          ),
          errors: Math.round(
            statsHistory.reduce((sum, entry) => sum + entry.stats.errors, 0) /
              statsHistory.length
          ),
          timeElapsed: Math.round(
            statsHistory.reduce(
              (sum, entry) => sum + entry.stats.timeElapsed,
              0
            ) / statsHistory.length
          ),
          charactersTyped: Math.round(
            statsHistory.reduce(
              (sum, entry) => sum + entry.stats.charactersTyped,
              0
            ) / statsHistory.length
          ),
          correctChars: Math.round(
            statsHistory.reduce(
              (sum, entry) => sum + entry.stats.correctChars,
              0
            ) / statsHistory.length
          ),
          incorrectChars: Math.round(
            statsHistory.reduce(
              (sum, entry) => sum + entry.stats.incorrectChars,
              0
            ) / statsHistory.length
          ),
        }
      : null;

  // Use average stats if available, otherwise show zeros
  const displayStats = averageStats || {
    wpm: 0,
    accuracy: 0,
    errors: 0,
    timeElapsed: 0,
    charactersTyped: 0,
    correctChars: 0,
    incorrectChars: 0,
  };

  const wpmTrend = getTrend(displayStats.wpm, settings.wpmTarget);
  const accuracyTrend = getTrend(displayStats.accuracy, getAccuracyTarget());
  const errorsTrend = displayStats.errors > 0 ? "up" : "stable";

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendText = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "up";
      case "down":
        return "down";
      case "stable":
        return "stable";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Performance Statistics</h2>
        <p className="text-muted-foreground">
          Track your typing progress and performance metrics
        </p>
      </div>

      {statsHistory.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Target className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  No Statistics Yet
                </h3>
                <p className="text-muted-foreground">
                  Complete some practice sessions or tests to see your
                  performance statistics here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* WPM Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>WPM</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(wpmTrend)}
                    <span className="text-xs text-muted-foreground">
                      {getTrendText(wpmTrend)}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{displayStats.wpm}</span>
                  <span className="text-sm text-muted-foreground">wpm</span>
                </div>
                {settings.showWPMTarget && (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Target: {settings.wpmTarget}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {Math.min(
                            100,
                            Math.round(
                              (displayStats.wpm / settings.wpmTarget) * 100
                            )
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={Math.min(
                          100,
                          (displayStats.wpm / settings.wpmTarget) * 100
                        )}
                        className="h-2"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Accuracy Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>Accuracy</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(accuracyTrend)}
                    <span className="text-xs text-muted-foreground">
                      {getTrendText(accuracyTrend)}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {displayStats.accuracy}
                  </span>
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Target: {getAccuracyTarget()}%
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>
                      {Math.min(
                        100,
                        Math.round(
                          (displayStats.accuracy / getAccuracyTarget()) * 100
                        )
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={Math.min(
                      100,
                      (displayStats.accuracy / getAccuracyTarget()) * 100
                    )}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Errors Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>Errors</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(errorsTrend)}
                    <span className="text-xs text-muted-foreground">
                      {getTrendText(errorsTrend)}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">
                    {displayStats.errors}
                  </span>
                  <span className="text-sm text-muted-foreground">errors</span>
                </div>
              </CardContent>
            </Card>

            {/* Time Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>Time</span>
                  <div className="flex items-center gap-1">
                    <Minus className="h-4 w-4 text-gray-600" />
                    <span className="text-xs text-muted-foreground">
                      stable
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {displayStats.timeElapsed}
                  </span>
                  <span className="text-sm text-muted-foreground">s</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Characters Typed:</span>
                  <span className="font-mono">
                    {displayStats.charactersTyped}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Correct Characters:</span>
                  <span className="font-mono text-green-600">
                    {displayStats.correctChars}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Incorrect Characters:</span>
                  <span className="font-mono text-red-600">
                    {displayStats.incorrectChars}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Characters per Second:</span>
                  <span className="font-mono">
                    {displayStats.timeElapsed > 0
                      ? (
                          displayStats.charactersTyped /
                          displayStats.timeElapsed
                        ).toFixed(1)
                      : 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Targets & Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>WPM Target:</span>
                  <span className="font-mono">{settings.wpmTarget} WPM</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy Target:</span>
                  <span className="font-mono">{getAccuracyTarget()}%</span>
                </div>
                <div className="flex justify-between">
                  <span>WPM Progress:</span>
                  <span className="font-mono">
                    {Math.min(
                      100,
                      Math.round((displayStats.wpm / settings.wpmTarget) * 100)
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy Progress:</span>
                  <span className="font-mono">
                    {Math.min(
                      100,
                      Math.round(
                        (displayStats.accuracy / getAccuracyTarget()) * 100
                      )
                    )}
                    %
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
