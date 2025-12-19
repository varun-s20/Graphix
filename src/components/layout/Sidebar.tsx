import {
  Github,
  Database,
  Layers,
  Settings,
  Moon,
  Share2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
}

function NavItem({ icon, active }: NavItemProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg cursor-pointer transition-all",
        active
          ? "bg-transparent text-white border-l-2 border-white rounded-none"
          : "text-gray-500 hover:text-white"
      )}
    >
      {icon}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-16 border-r border-border flex flex-col items-center py-4 bg-[#09090b] z-50">
      <div className="mb-6">
        <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M7 20l10-16" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        {/* Using GitHub icon as placeholder for the specific ones in image */}
        <NavItem icon={<Github size={24} />} active />
        <NavItem icon={<Database size={24} />} />
        <NavItem icon={<Layers size={24} />} />
        <NavItem icon={<Share2 size={24} />} />
      </div>

      <div className="mt-auto flex flex-col gap-4 items-center mb-4">
        <NavItem icon={<Moon size={24} />} />
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
          <img
            src="https://github.com/shadcn.png"
            className="rounded-full w-full h-full"
            alt="User"
          />
        </div>
      </div>
    </div>
  );
}
