import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings as SettingsType } from "@/lib/types";
import { KEYBOARD_THEMES } from "@/lib/constants";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: SettingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src="/tt-tutor-logo.svg"
              alt="TT Tutor Logo"
              className="h-6 w-auto"
            />
            <span>Customization Settings</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <AppearanceTab
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
          <KeyboardTab
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
          <AudioTab settings={settings} onSettingsChange={onSettingsChange} />
          <PracticeTab
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AppearanceTab = ({
  settings,
  onSettingsChange,
}: {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}) => (
  <TabsContent value="appearance" className="space-y-4 mt-4">
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">App Theme</Label>
        <Select
          value={settings.appTheme}
          onValueChange={(value: SettingsType["appTheme"]) =>
            onSettingsChange({ ...settings, appTheme: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark
              </div>
            </SelectItem>
            <SelectItem value="system">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                System
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Visual Feedback</Label>
        <Select
          value={settings.visualFeedback}
          onValueChange={(value: SettingsType["visualFeedback"]) =>
            onSettingsChange({ ...settings, visualFeedback: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subtle">Subtle</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="intense">Intense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Animation Speed: {settings.animationSpeed}%
        </Label>
        <Slider
          value={[settings.animationSpeed]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, animationSpeed: value })
          }
          max={200}
          min={50}
          step={25}
          className="w-full"
        />
      </div>
    </div>
  </TabsContent>
);

const KeyboardTab = ({
  settings,
  onSettingsChange,
}: {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}) => {
  // Check if keyboard theme is being auto-managed
  const isAutoManaged =
    settings.keyboardTheme === "default" ||
    settings.keyboardTheme === "minimalDark";
  const isSystemTheme = settings.appTheme === "system";

  return (
    <TabsContent value="keyboard" className="space-y-4 mt-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Keyboard Theme</Label>
            {isAutoManaged && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                Auto-managed
              </span>
            )}
          </div>
          <Select
            value={settings.keyboardTheme}
            onValueChange={(value: SettingsType["keyboardTheme"]) =>
              onSettingsChange({ ...settings, keyboardTheme: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(KEYBOARD_THEMES).map(([key, theme]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    {theme.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isAutoManaged && (
            <p className="text-xs text-muted-foreground">
              Theme automatically switches between &quot;Default&quot; (light) and
              &quot;Minimal Dark&quot; (dark) based on your app theme.
              {isSystemTheme && " Changes with system preference."}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Keyboard Size: {settings.keyboardSize}%
          </Label>
          <Slider
            value={[settings.keyboardSize]}
            onValueChange={([value]) =>
              onSettingsChange({ ...settings, keyboardSize: value })
            }
            max={150}
            min={50}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Highlight Intensity: {settings.highlightIntensity}%
          </Label>
          <Slider
            value={[settings.highlightIntensity]}
            onValueChange={([value]) =>
              onSettingsChange({ ...settings, highlightIntensity: value })
            }
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Show Finger Guide</Label>
          <Switch
            checked={settings.showFingerGuide}
            onCheckedChange={(checked) =>
              onSettingsChange({ ...settings, showFingerGuide: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Show Key Labels</Label>
          <Switch
            checked={settings.showKeyLabels}
            onCheckedChange={(checked) =>
              onSettingsChange({ ...settings, showKeyLabels: checked })
            }
          />
        </div>
      </div>
    </TabsContent>
  );
};

const AudioTab = ({
  settings,
  onSettingsChange,
}: {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}) => (
  <TabsContent value="audio" className="space-y-4 mt-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Sound Effects</Label>
        <Switch
          checked={settings.soundEnabled}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, soundEnabled: checked })
          }
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Sound Volume: {settings.soundVolume}%
        </Label>
        <Slider
          value={[settings.soundVolume]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, soundVolume: value })
          }
          max={100}
          min={0}
          step={5}
          className="w-full"
          disabled={!settings.soundEnabled}
        />
      </div>
    </div>
  </TabsContent>
);

const PracticeTab = ({
  settings,
  onSettingsChange,
}: {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}) => (
  <TabsContent value="practice" className="space-y-4 mt-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Show WPM Target</Label>
        <Switch
          checked={settings.showWPMTarget}
          onCheckedChange={(checked) =>
            onSettingsChange({ ...settings, showWPMTarget: checked })
          }
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">
          WPM Target: {settings.wpmTarget}
        </Label>
        <Slider
          value={[settings.wpmTarget]}
          onValueChange={([value]) =>
            onSettingsChange({ ...settings, wpmTarget: value })
          }
          max={120}
          min={20}
          step={5}
          className="w-full"
          disabled={!settings.showWPMTarget}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Keyboard Layout</Label>
        <Select
          value={settings.keyboardLayout}
          onValueChange={(value: SettingsType["keyboardLayout"]) =>
            onSettingsChange({ ...settings, keyboardLayout: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="qwerty">QWERTY</SelectItem>
            <SelectItem value="dvorak">Dvorak</SelectItem>
            <SelectItem value="colemak">Colemak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </TabsContent>
);
