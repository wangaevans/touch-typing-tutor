import { Hand } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "@/lib/types";

interface FingerGuideProps {
  show: boolean;
  settings: Settings;
}

export default function FingerGuide({ show }: FingerGuideProps) {
  if (!show) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Hand className="h-5 w-5" />
          Finger Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <img
            src="/img/finger-guide.png"
            alt="Keyboard finger placement guide"
            className="max-w-full h-auto rounded-lg shadow-lg"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
