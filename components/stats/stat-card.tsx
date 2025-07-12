import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  target?: number;
  color?: string;
  trend?: "up" | "down" | "stable";
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  target,
  color = "blue",
  trend,
}: StatCardProps) => {
  const getGradientClass = () => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-blue-600";
      case "green":
        return "from-green-500 to-green-600";
      case "red":
        return "from-red-500 to-red-600";
      case "purple":
        return "from-purple-500 to-purple-600";
      case "orange":
        return "from-orange-500 to-orange-600";
      case "pink":
        return "from-pink-500 to-pink-600";
      default:
        return "from-blue-500 to-blue-600";
    }
  };

  const getIconColorClass = () => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      case "purple":
        return "text-purple-600";
      case "orange":
        return "text-orange-600";
      case "pink":
        return "text-pink-600";
      default:
        return "text-blue-600";
    }
  };

  const getProgressColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "purple":
        return "bg-purple-500";
      case "orange":
        return "bg-orange-500";
      case "pink":
        return "bg-pink-500";
      default:
        return "bg-blue-500";
    }
  };

  const progressValue = target ? (value / target) * 100 : 0;
  const isTargetMet = target ? value >= target : false;

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 h-full min-h-[200px] flex flex-col">
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradientClass()} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Animated border */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${getGradientClass()} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}
      />

      <CardContent className="p-6 relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${getGradientClass()} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
            >
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {label}
              </span>
              {trend && (
                <div className="flex items-center gap-1 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      trend === "up"
                        ? "bg-green-500"
                        : trend === "down"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-xs text-gray-500 capitalize">
                    {trend}
                  </span>
                </div>
              )}
            </div>
          </div>
          {target && (
            <Badge
              variant={isTargetMet ? "default" : "secondary"}
              className={`${
                isTargetMet
                  ? `bg-gradient-to-r ${getGradientClass()} text-white border-0`
                  : "bg-gray-100 text-gray-600"
              } font-semibold shadow-sm`}
            >
              Target: {target}
            </Badge>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                {value}
              </span>
              {label === "WPM" && (
                <span className="text-sm text-gray-500 font-medium">wpm</span>
              )}
              {label === "Accuracy" && (
                <span className="text-sm text-gray-500 font-medium">%</span>
              )}
              {label === "Time" && (
                <span className="text-sm text-gray-500 font-medium">s</span>
              )}
            </div>

            {target && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Progress</span>
                  <span
                    className={`font-bold ${
                      isTargetMet ? getIconColorClass() : "text-gray-500"
                    }`}
                  >
                    {Math.round(progressValue)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={progressValue}
                    className={`h-3 bg-gray-200 group-hover:bg-gray-100 transition-colors duration-300`}
                  />
                  <div
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ease-out ${
                      isTargetMet ? getProgressColorClass() : "bg-gray-400"
                    }`}
                    style={{ width: `${Math.min(progressValue, 100)}%` }}
                  />
                </div>
              </div>
            )}
              </div>
          </div>
      </CardContent>
    </Card>
  );
};
