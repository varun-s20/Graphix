import { useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Maximize, Plus, PanelRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export function TopBar() {
  const reactFlow = useReactFlow();
  const { setMobilePanelOpen } = useStore();

  const handleFitView = () => {
    if (reactFlow) {
      reactFlow.fitView({ duration: 500 });
    }
  };

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-background z-10 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg">App Graph Builder</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleFitView}>
          <Maximize className="mr-2 h-4 w-4" />
          Fit View
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Action
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobilePanelOpen(true)}
        >
          <PanelRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
