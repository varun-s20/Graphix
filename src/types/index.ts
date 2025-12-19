import type { Node, Edge } from "@xyflow/react";

export interface App {
  id: string;
  name: string;
  createdAt: string;
}

export type ServiceStatus = "healthy" | "degraded" | "down";

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  status: ServiceStatus;
  config: {
    memory: number;
    cpu: number; 
  };
  description?: string;
}

export type ServiceNode = Node<ServiceNodeData>;

export interface GraphData {
  nodes: ServiceNode[];
  edges: Edge[];
}
