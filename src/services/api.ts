import type { App, GraphData } from "@/types";

const MOCK_APPS: App[] = [
  { id: "app-1", name: "E-Commerce Platform", createdAt: "2023-01-15" },
  { id: "app-2", name: "Analytics Dashboard", createdAt: "2023-03-10" },
  { id: "app-3", name: "Auth Service", createdAt: "2023-05-22" },
];

const MOCK_GRAPHS: Record<string, GraphData> = {
  "app-1": {
    nodes: [
      {
        id: "1",
        type: "service",
        position: { x: 250, y: 5 },
        data: {
          label: "Frontend",
          status: "healthy",
          config: { memory: 60, cpu: 45 },
          description: "React Frontend",
        },
      },
      {
        id: "2",
        type: "service",
        position: { x: 100, y: 200 },
        data: {
          label: "Auth Service",
          status: "healthy",
          config: { memory: 30, cpu: 20 },
          description: "Handles authentication",
        },
      },
      {
        id: "3",
        type: "service",
        position: { x: 400, y: 200 },
        data: {
          label: "Product API",
          status: "degraded",
          config: { memory: 85, cpu: 70 },
          description: "Main product catalog",
        },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e1-3", source: "1", target: "3", animated: true },
    ],
  },
  "app-2": {
    nodes: [
      {
        id: "1",
        type: "service",
        position: { x: 250, y: 5 },
        data: {
          label: "Ingestion",
          status: "healthy",
          config: { memory: 50, cpu: 50 },
        },
      },
      {
        id: "2",
        type: "service",
        position: { x: 250, y: 200 },
        data: {
          label: "Processor",
          status: "down",
          config: { memory: 90, cpu: 95 },
        },
      },
      {
        id: "3",
        type: "service",
        position: { x: 250, y: 400 },
        data: {
          label: "Database",
          status: "healthy",
          config: { memory: 40, cpu: 30 },
        },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
    ],
  },
  "app-3": {
    nodes: [
      {
        id: "1",
        type: "service",
        position: { x: 100, y: 100 },
        data: {
          label: "Identity",
          status: "healthy",
          config: { memory: 20, cpu: 10 },
        },
      },
    ],
    edges: [],
  },
};

const SIMULATED_LATENCY = 800; // ms

export const api = {
  getApps: async (): Promise<App[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_APPS);
      }, SIMULATED_LATENCY);
    });
  },

  getGraph: async (appId: string): Promise<GraphData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const graph = MOCK_GRAPHS[appId];
        if (graph) {
          resolve(graph);
        } else {
          // Fallback or empty
          resolve({ nodes: [], edges: [] });
        }
      }, SIMULATED_LATENCY);
    });
  },
};
