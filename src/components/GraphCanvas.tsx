import { useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useReactFlow,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useStore } from "@/store/useStore";
import { ServiceNode } from "@/components/nodes/ServiceNode";

const nodeTypes = {
  service: ServiceNode as any,
};

export function GraphCanvas() {
  const {
    selectedAppId,
    setSelectedNodeId,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges,
  } = useStore();

  const { fitView } = useReactFlow();

  const { data } = useQuery({
    queryKey: ["graph", selectedAppId],
    queryFn: () =>
      selectedAppId
        ? api.getGraph(selectedAppId)
        : Promise.resolve({ nodes: [], edges: [] }),
    enabled: !!selectedAppId,
  });

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
      setTimeout(() => {
        fitView({ duration: 500, padding: 0.2 });
      }, 50);
    }
  }, [data, setNodes, setEdges, fitView]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        fitView({ duration: 500 });
      }
      if (e.shiftKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleAddNode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fitView]);

  const handleAddNode = () => {
    const id = `node-${Date.now()}`;
    const newNode: any = {
      id,
      type: "service",
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        label: "New Service",
        status: "healthy",
        config: { cpu: 50, memory: 50 },
      },
    };

    useStore.getState().addNode(newNode);
  };

  const onSelectionChange = useCallback(
    ({ nodes }: { nodes: Node[] }) => {
      if (nodes.length > 0) {
        setSelectedNodeId(nodes[0].id);
      } else {
        setSelectedNodeId(null);
      }
    },
    [setSelectedNodeId]
  );

  return (
    <div className="h-full w-full bg-[#09090b] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        fitView
        colorMode="dark"
        className="text-foreground"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#333" // Darker dots
        />
        {!selectedAppId && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground">
            Select an application
          </div>
        )}
      </ReactFlow>
    </div>
  );
}
