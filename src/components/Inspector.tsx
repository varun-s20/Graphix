import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

export function Inspector() {
  const {
    selectedNodeId,
    activeInspectorTab,
    setActiveInspectorTab,
    nodes,
    updateNode,
  } = useStore();

  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node || node.type !== "service") {
    return (
      <div className="p-4 text-center text-muted-foreground mt-10">
        {selectedNodeId
          ? "Selected node is not a service node"
          : "Select a node to view details"}
      </div>
    );
  }

  const { label, status, config, description } = node.data;

  const handleUpdate = (updates: Partial<typeof node.data>) => {
    updateNode(node.id, updates);
  };

  const handleStatusChange = () => {
    const nextStatus =
      status === "healthy"
        ? "degraded"
        : status === "degraded"
        ? "down"
        : "healthy";
    handleUpdate({ status: nextStatus });
  };

  return (
    <div className="h-full flex flex-col bg-background border-l w-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Service Inspector</h2>
        <Badge
          variant="outline"
          className="cursor-pointer hover:opacity-80 transition-opacity select-none"
          onClick={handleStatusChange}
        >
          {status ? status.toUpperCase() : "UNKNOWN"}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Fields */}
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="node-name">Name</Label>
            <Input
              id="node-name"
              value={label}
              onChange={(e) => handleUpdate({ label: e.target.value })}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="node-desc">Description</Label>
            <Input
              id="node-desc"
              value={description || ""}
              onChange={(e) => handleUpdate({ description: e.target.value })}
              placeholder="Enter description..."
            />
          </div>
        </div>

        <Separator />

        <Tabs
          value={activeInspectorTab}
          onValueChange={setActiveInspectorTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="runtime">Runtime</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4 pt-4">
            <div className="space-y-4">
              <Label>Memory Allocation (MB)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.memory]}
                  max={100}
                  step={1}
                  onValueChange={([val]) =>
                    handleUpdate({ config: { ...config, memory: val } })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.memory}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 0 && val <= 100) {
                      handleUpdate({ config: { ...config, memory: val } });
                    }
                  }}
                  className="w-16 h-8"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>CPU Limit (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.cpu]}
                  max={100}
                  step={1}
                  onValueChange={([val]) =>
                    handleUpdate({ config: { ...config, cpu: val } })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.cpu}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 0 && val <= 100) {
                      handleUpdate({ config: { ...config, cpu: val } });
                    }
                  }}
                  className="w-16 h-8"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="runtime">
            <div className="text-sm text-muted-foreground">
              Runtime metrics simulated.
              <div className="mt-4 p-2 bg-muted rounded text-xs font-mono">
                ID: {node.id}
                <br />
                X: {node.position.x.toFixed(0)}, Y: {node.position.y.toFixed(0)}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
