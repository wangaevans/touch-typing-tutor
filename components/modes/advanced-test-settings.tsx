import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings } from "@/lib/types";
import {
  TEST_LEVELS,
  TEST_TYPES,
  getRecommendedDuration,
} from "@/lib/advanced-tests";

interface AdvancedTestSettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const AdvancedTestSettings = ({
  settings,
  onSettingsChange,
}: AdvancedTestSettingsProps) => {
  const handleLevelChange = (level: string) => {
    const newSettings = {
      ...settings,
      testLevel: level as Settings["testLevel"],
    };
    // Auto-adjust duration based on level and type
    const recommendedDuration = getRecommendedDuration(
      level,
      settings.testType
    );
    newSettings.testDuration = recommendedDuration;
    onSettingsChange(newSettings);
  };

  const handleTypeChange = (type: string) => {
    const newSettings = { ...settings, testType: type as Settings["testType"] };
    // Auto-adjust duration based on level and type
    const recommendedDuration = getRecommendedDuration(
      settings.testLevel,
      type
    );
    newSettings.testDuration = recommendedDuration;
    onSettingsChange(newSettings);
  };

  const handleLengthChange = (length: string) => {
    onSettingsChange({
      ...settings,
      testLength: length as Settings["testLength"],
    });
  };

  const getCurrentLevel = () =>
    TEST_LEVELS.find((level) => level.id === settings.testLevel);
  const getCurrentType = () =>
    TEST_TYPES.find((type) => type.id === settings.testType);

  const currentLevel = getCurrentLevel();
  const currentType = getCurrentType();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Advanced Test Settings</span>
          <Badge variant="secondary">Advanced</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Test Level */}
        <div className="space-y-2">
          <Label htmlFor="test-level">Test Level</Label>
          <Select value={settings.testLevel} onValueChange={handleLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select test level" />
            </SelectTrigger>
            <SelectContent>
              {TEST_LEVELS.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{level.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {level.minWPM}-{level.maxWPM} WPM
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentLevel && (
            <p className="text-sm text-muted-foreground">
              {currentLevel.description}
            </p>
          )}
        </div>

        {/* Test Type */}
        <div className="space-y-2">
          <Label htmlFor="test-type">Test Type</Label>
          <Select value={settings.testType} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select test type" />
            </SelectTrigger>
            <SelectContent>
              {TEST_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{type.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {type.category}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentType && (
            <p className="text-sm text-muted-foreground">
              {currentType.description}
            </p>
          )}
        </div>

        {/* Test Length */}
        <div className="space-y-2">
          <Label htmlFor="test-length">Test Length</Label>
          <Select
            value={settings.testLength}
            onValueChange={handleLengthChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select test length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">
                <div className="flex items-center justify-between w-full">
                  <span>Short</span>
                  <Badge variant="outline" className="ml-2">
                    ~200 chars
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center justify-between w-full">
                  <span>Medium</span>
                  <Badge variant="outline" className="ml-2">
                    ~500 chars
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="long">
                <div className="flex items-center justify-between w-full">
                  <span>Long</span>
                  <Badge variant="outline" className="ml-2">
                    ~1000+ chars
                  </Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recommended Duration */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recommended Duration</span>
            <Badge variant="secondary">
              {getRecommendedDuration(settings.testLevel, settings.testType)}s
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on your selected level and test type
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
