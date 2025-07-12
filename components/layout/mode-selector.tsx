import { Button } from "@/components/ui/button";

interface ModeSelectorProps {
  mode: "practice" | "test" | "stats";
  onModeChange: (mode: "practice" | "test" | "stats") => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-card rounded-lg p-1 shadow-md border flex flex-row flex-nowrap overflow-x-auto gap-2 w-full max-w-xl">
        <Button
          variant={mode === "practice" ? "default" : "ghost"}
          onClick={() => onModeChange("practice")}
          className="flex-1 min-w-[120px]"
        >
          Practice Mode
        </Button>
        <Button
          variant={mode === "test" ? "default" : "ghost"}
          onClick={() => onModeChange("test")}
          className="flex-1 min-w-[120px]"
        >
          Test Mode
        </Button>
        <Button
          variant={mode === "stats" ? "default" : "ghost"}
          onClick={() => onModeChange("stats")}
          className="flex-1 min-w-[120px]"
        >
          Statistics
        </Button>
      </div>
    </div>
  );
};
