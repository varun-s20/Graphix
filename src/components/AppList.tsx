import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useStore } from "@/store/useStore";
import {
  Loader2,
  Search,
  Plus,
  Lightbulb,
  Code2,
  Rocket,
  FileText,
  Puzzle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AppIcon = ({ index }: { index: number }) => {
  const icons = [
    { bg: "bg-blue-600", icon: Lightbulb },
    { bg: "bg-purple-600", icon: Code2 },
    { bg: "bg-red-500", icon: Rocket },
    { bg: "bg-pink-600", icon: FileText },
    { bg: "bg-indigo-600", icon: Puzzle },
  ];
  const { bg, icon: Icon } = icons[index % icons.length];
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm",
        bg
      )}
    >
      <Icon size={18} />
    </div>
  );
};

export function AppList() {
  const { data: apps, isLoading } = useQuery({
    queryKey: ["apps"],
    queryFn: api.getApps,
  });

  const { selectedAppId, setSelectedAppId } = useStore();

  if (isLoading) return null;

  return (
    <div className="absolute left-20 top-20 z-20 w-80 bg-[#09090b] border border-border rounded-xl shadow-2xl overflow-hidden font-sans">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Application</h2>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              className="pl-9 bg-[#1a1b26] border-border text-sm h-9"
              placeholder="Search..."
            />
          </div>
          <Button
            size="icon"
            className="h-9 w-9 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="pb-2 max-h-[400px] overflow-y-auto">
        {apps?.map((app, i) => {
          const isSelected = selectedAppId === app.id;
          return (
            <div
              key={app.id}
              className={cn(
                "px-4 py-3 flex items-center justify-between cursor-pointer transition-colors border-l-2",
                isSelected
                  ? "bg-accent/50 border-blue-500"
                  : "hover:bg-accent/20 border-transparent"
              )}
              onClick={() => setSelectedAppId(app.id)}
            >
              <div className="flex items-center gap-3">
                <AppIcon index={i} />
                <span className="text-sm font-medium text-gray-200">
                  {app.name}
                </span>
              </div>
              <div className="text-muted-foreground">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
