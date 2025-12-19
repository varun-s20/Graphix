import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ServiceNode as ServiceNodeType } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Settings, Cpu, Database, HardDrive, Globe } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/store/useStore";

// AWS Logo SVG Component
const AWSLogo = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-10 text-yellow-500 fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.8 16.5c.5.5.8.5.8.5.5-.3.6-.5.6-1s-.1-1.3-.4-1.6c-.4-.5-1.1-.9-2.1-1.2l-.7-.3c-.6-.2-.8-.4-.8-.7 0-.2.1-.4.4-.4s.8.2.8.5c0 .3.4.4.6.4.2 0 .4-.1.4-.4 0-.6-.9-1.3-2.3-1.3-1.2 0-2.1.6-2.1 1.6 0 .6.4 1 1 1.3l.8.3c.7.2.9.5.9.8 0 .4-.5.6-.9.6-1.1 0-1.4-.7-1.4-.7-.2 0-.5.2-.5.5 0 .6.9 1.1 2.3 1.1zm-8.3-2l-.3-1.1-.3 1.1h.6zm1-4.8c-.3 0-.5.2-.6.7l-1.9 6h-1c0 .2.2.4.5.4h1.7c.3 0 .4-.2.4-.4H9l.2-.9h2.3l.2.9h-.5c0 .2.2.4.5.4h1.6c.3 0 .4-.2.4-.4h-.8l-2-6c-.1-.5-.3-.7-.6-.7h-.8zM7.5 10.4c-.4 0-.5.3-.5.3L5.4 15c-.2.6-.4.9-1.1.9h-.6c0 .2.3.4.6.4h2.2c.3 0 .5-.2.5-.4h-.8l.4-1.4 1.3 4.3c0 .2.3.3.6.3.3 0 .5-.2.6-.4l1.6-4.9.4 1.6h-.6c0 .2.2.4.5.4h1.4c.3 0 .4-.2.4-.4h-.8l-1.9-6c-.2-.5-.4-.7-.7-.7-.3 0-.6.3-.7.5l-1.2 4-1.1-4c-.1-.3-.4-.5-.7-.5H7.5zm10.9 8.2c-1.3 0-2.1-.3-2.9-.6-.2-.1-.4 0-.5.1l-.3.3c-.1.2 0 .4.2.5.9.3 1.9.7 3.4.7 2 0 3.2-.8 3.2-2.3 0-.4-.3-.6-.5-.6-.5 0-.6.5-.6 1.9Z" />
  </svg>
);

const MetricTab = ({
  active,
  icon: Icon,
  label,
}: {
  active?: boolean;
  icon: any;
  label: string;
}) => (
  <div
    className={cn(
      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border",
      active
        ? "bg-white text-black border-white"
        : "bg-transparent text-muted-foreground border-transparent hover:bg-white/5"
    )}
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </div>
);

export function ServiceNode({
  id,
  data,
  selected,
}: NodeProps<ServiceNodeType>) {
  const { updateNode } = useStore();
  const { label, status, config } = data;

  const isRedis = label.toLowerCase().includes("redis");
  const isPostgres = label.toLowerCase().includes("postgres");
  const isMongo = label.toLowerCase().includes("mongo");
  const Icon = isRedis
    ? Database
    : isPostgres
    ? Database
    : isMongo
    ? Database
    : Cpu;
  const brandColor = isRedis
    ? "text-red-500"
    : isPostgres
    ? "text-blue-500"
    : isMongo
    ? "text-green-500"
    : "text-purple-500";

  const statusColor =
    status === "healthy"
      ? "bg-green-500/20 text-green-500 border-green-500/30"
      : status === "down"
      ? "bg-red-500/20 text-red-500 border-red-500/30"
      : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";

  const statusText = status === "healthy" ? "Success" : "Error";

  const handleSliderChange = (val: number[]) => {
    updateNode(id, { config: { ...config, cpu: val[0] } });
  };

  return (
    <div
      className={cn(
        "w-[400px] bg-[#09090b] rounded-xl border border-border shadow-2xl overflow-hidden font-sans",
        selected
          ? "ring-2 ring-primary border-transparent"
          : "hover:border-primary/50"
      )}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-muted-foreground opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-muted-foreground opacity-0"
      />

      {/* Header */}
      <div className="p-4 flex items-center justify-between pb-0">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-secondary", brandColor)}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground leading-none mb-1">
              {label}
            </h3>
            <span className="text-xs font-mono text-green-400 bg-green-950/30 px-1.5 py-0.5 rounded border border-green-900">
              $0.03/HR
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Settings size={18} />
        </Button>
      </div>

      {/* Metrics Tabs */}
      <div className="px-4 py-4 flex items-center gap-1 justify-between">
        <MetricTab icon={Cpu} label="CPU" active />
        <MetricTab icon={HardDrive} label="Memory" />
        <MetricTab icon={Database} label="Disk" />
        <MetricTab icon={Globe} label="Region" />
      </div>

      {/* Slider Section */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>0.02</span>
          <span>0.05 GB</span>
          <span>10.00 GB</span>
          <span>1</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-6 flex items-center">
            {/* Custom Gradient Slider */}
            <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 relative">
              <Slider
                value={[config?.cpu || 0]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
                className="absolute inset-0 cursor-pointer w-full h-full opacity-0 z-10"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow pointer-events-none transition-transform"
                style={{ left: `${config?.cpu || 0}%` }}
              />
            </div>
          </div>
          <div className="bg-black border border-border rounded px-2 py-1 min-w-[60px] text-right font-mono text-xs text-foreground">
            {(((config?.cpu || 0) / 100) * 2).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-black/20 border-t border-border flex items-center justify-between">
        <div
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
            statusColor
          )}
        >
          {status === "healthy" ? (
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          )}
          {statusText}
        </div>
        <AWSLogo />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
