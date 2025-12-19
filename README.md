# App Graph Builder - Graphix

A responsive ReactFlow-based application for visualizing and managing service application graphs.


## Features

- **Interactive Graph Canvas**: Visualize service nodes and edges with zoom, pan, drag, and fit view capabilities.
- **Node Inspector**: Inspect and modify node configuration (CPU, Memory, Name) with real-time synchronization.
- **Service Status**: Visual indicators and editing for service health (Healthy, Degraded, Down).
- **Multi-App Support**: Switch between different application graphs (simulated).
- **Responsive Design**: Collapsible sidebar and mobile-friendly drawer for app selection and inspection.
- **Mock API**: Simulated data fetching with latency using TanStack Query.
- **State Management**: powered by Zustand for UI and Graph state.

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript (Strict Mode)
- **UI Library**: shadcn/ui (Tailwind CSS + Radix UI)
- **Graph Library**: @xyflow/react (ReactFlow 12)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React

## Setup Instructions

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Start Development Server**:

    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Key Engineering Decisions

- **State Management**: `zustand` is used for both global UI state (selected app/node) and the Graph state (nodes/edges). This allows the `Inspector` component to easily update node data without complex prop drilling or context bridging, and ensures the `GraphCanvas` reflects changes immediately.
- **Custom Node**: A `ServiceNode` component customizes the appearance of graph nodes to display status badges and metrics, utilizing `<Handle>` for connectivity.
- **Mocking Strategy**: Simple `Promise`-based mock services with `setTimeout` were chosen over MSW for simplicity and speed of implementation while still demonstrating async data handling and loading states.
- **Component Architecture**: The application is split into `MainLayout`, `GraphCanvas`, `Inspector`, and `AppList` to separate concerns. Shared UI components follow the `shadcn/ui` pattern.

## Known Limitations

- **Persistence**: Changes made to nodes (name, config, status) are local to the current session and are lost when switching apps or refreshing, as the Mock API is read-only.
- **New Nodes**: The "Add Node" button is a placeholder in this version (as per "Bonus" non-critical scope).
- **Edge Editing**: Edges are static from the mock API; creating new connections is not currently enabled in the UI (though ReactFlow supports it).
