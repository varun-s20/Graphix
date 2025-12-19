import { ReactFlowProvider } from "@xyflow/react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { GraphCanvas } from "@/components/GraphCanvas";
import { RightPanelContent } from "@/components/RightPanelContent"; 

import { useStore } from "@/store/useStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AppList } from "@/components/AppList";

export function MainLayout() {
  const { isMobilePanelOpen, setMobilePanelOpen } = useStore();

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden text-foreground font-sans">
        {/* Left Rail */}
        <Sidebar />

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        

          {/* Canvas Area */}
          <div className="flex-1 flex overflow-hidden relative bg-[#09090b]">
            {/* Floating App List */}
            <AppList />

            <div className="flex-1 relative h-full">
              <GraphCanvas />
            </div>

           
          </div>
        </div>

        <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
          <SheetContent
            side="right"
            className="p-0 w-80 bg-[#09090b] text-white border-l border-border"
          >
            <AppList />
          </SheetContent>
        </Sheet>
      </div>
    </ReactFlowProvider>
  );
}
