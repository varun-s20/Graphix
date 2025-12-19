import { AppList } from "@/components/AppList";
import { Inspector } from "@/components/Inspector";
import { useStore } from "@/store/useStore";

export function RightPanelContent() {
  const { selectedNodeId } = useStore();

  return (
    <div className="flex flex-col h-full bg-background">
      <div
        className={`transition-all duration-300 ${
          selectedNodeId ? "h-1/2 border-b" : "h-full"
        }`}
      >
        <AppList />
      </div>

      {selectedNodeId && (
        <div className="h-1/2 transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
          <Inspector />
        </div>
      )}
    </div>
  );
}
