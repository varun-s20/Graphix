import { create } from "zustand";
import {
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import type { ServiceNode } from "@/types";

interface AppState {
  selectedAppId: string | null;
  setSelectedAppId: (id: string | null) => void;

  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;

  isMobilePanelOpen: boolean;
  setMobilePanelOpen: (open: boolean) => void;

  activeInspectorTab: string;
  setActiveInspectorTab: (tab: string) => void;

  nodes: ServiceNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<ServiceNode>;
  onEdgesChange: OnEdgesChange;
  setNodes: (nodes: ServiceNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNode: (id: string, data: Partial<ServiceNode["data"]>) => void;
  addNode: (node: ServiceNode) => void;
}

export const useStore = create<AppState>((set, get) => ({
  selectedAppId: null,
  setSelectedAppId: (id) => set({ selectedAppId: id }),

  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  isMobilePanelOpen: false,
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),

  activeInspectorTab: "config",
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  nodes: [],
  edges: [],
  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes) as ServiceNode[],
    }),
  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  updateNode: (id, data) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }),
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
}));
