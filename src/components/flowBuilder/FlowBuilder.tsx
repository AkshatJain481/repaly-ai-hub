import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  addEdge,
  Connection,
  Node,
  Edge,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { RootState, AppDispatch } from "@/redux/store";
import {
  updateNodePosition,
  addEdge as addFlowEdge,
  loadFlows,
  newFlow,
} from "@/redux/slices/flow.slice";
import FlowBuilderSidebar from "./FlowBuilderSidebar";
import FlowBuilderToolbar from "./FlowBuilderToolbar";
import NodeConfigModal from "./NodeConfigModal";
import TriggerNode from "./nodes/TriggerNode";
import ConditionNode from "./nodes/ConditionNode";
import ActionNode from "./nodes/ActionNode";
import DelayNode from "./nodes/DelayNode";
import MessageNode from "./nodes/MessageNode";
import ButtonNode from "./nodes/ButtonNode";
import LoopNode from "./nodes/LoopNode";
import RandomizerNode from "./nodes/RandomizerNode";
import ConfirmationPopup from "../common/ConfirmationPopup";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  delay: DelayNode,
  message: MessageNode,
  button: ButtonNode,
  loop: LoopNode,
  randomizer: RandomizerNode,
};

const FlowBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentFlow } = useSelector((state: RootState) => state.flow);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [affectedNodes, setAffectedNodes] = useState<string[]>([]);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Initialize flow with a trigger and message node if empty
  useEffect(() => {
    if (currentFlow.nodes.length === 0) {
      dispatch(newFlow());

      // Add initial trigger node
      dispatch({
        type: "flow/addNode",
        payload: {
          type: "trigger",
          position: { x: 250, y: 100 },
        },
      });

      // Add initial message node
      dispatch({
        type: "flow/addNode",
        payload: {
          type: "message",
          position: { x: 250, y: 250 },
        },
      });
    }
  }, [currentFlow.id, dispatch]);

  // Sync Redux state with React Flow state
  useEffect(() => {
    const flowNodes = currentFlow.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        label: node.data.label,
        config: node.data.config || {},
        onDelete: handleNodeDeleteClick,
      },
    }));
    setNodes(flowNodes);
  }, [currentFlow.nodes]);

  useEffect(() => {
    const flowEdges = currentFlow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      label: edge.label,
    }));
    setEdges(flowEdges);
  }, [currentFlow.edges]);

  useEffect(() => {
    dispatch(loadFlows());
  }, [dispatch]);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        id: `${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        type: "default",
      };
      dispatch(addFlowEdge(edge));
      setEdges((eds) => addEdge(params, eds));
    },
    [dispatch, setEdges]
  );

  const onNodeDragStop = useCallback(
    (_: any, node: Node) => {
      dispatch(updateNodePosition({ id: node.id, position: node.position }));
    },
    [dispatch]
  );

  // Handle node delete click
  const handleNodeDeleteClick = (nodeId: string) => {
    // Prevent deletion of the first trigger node
    const nodeIndex = currentFlow.nodes.findIndex((node) => node.id === nodeId);
    const node = currentFlow.nodes[nodeIndex];

    if (node.type === "trigger" && nodeIndex === 0) {
      return; // Don't allow deletion of the first trigger node
    }

    // Find nodes that would be affected (downstream nodes)
    const downstreamNodes = findDownstreamNodes(nodeId);

    if (downstreamNodes.length > 0) {
      // Show confirmation modal for deleting nodes with connections
      setNodeToDelete(nodeId);
      setAffectedNodes(downstreamNodes);
      setIsDeleteModalOpen(true);
    } else {
      // Delete node directly if no downstream nodes
      dispatch({ type: "flow/deleteNode", payload: nodeId });
    }
  };

  // Find nodes that would be affected by deleting a node
  const findDownstreamNodes = (nodeId: string): string[] => {
    const result: string[] = [];
    const visited = new Set<string>();

    const traverse = (currentId: string) => {
      if (visited.has(currentId)) return;
      visited.add(currentId);

      const outgoingEdges = currentFlow.edges.filter(
        (e) => e.source === currentId
      );
      for (const edge of outgoingEdges) {
        result.push(edge.target);
        traverse(edge.target);
      }
    };

    traverse(nodeId);
    return result;
  };

  // Handle node deletion confirmation
  const handleDeleteConfirm = () => {
    if (nodeToDelete) {
      dispatch({ type: "flow/deleteNode", payload: nodeToDelete });
      setIsDeleteModalOpen(false);
      setNodeToDelete(null);
      setAffectedNodes([]);
    }
  };

  // Cancel node deletion
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setNodeToDelete(null);
    setAffectedNodes([]);
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <FlowBuilderSidebar />

      <div className="flex-1 flex flex-col">
        <FlowBuilderToolbar />

        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-100 dark:bg-gray-800"
            deleteKeyCode={null} // Disable default delete key behavior
          >
            <Controls className="bg-white dark:bg-gray-700" />
            <MiniMap
              className="bg-white dark:bg-gray-700"
              nodeColor={(node) => {
                switch (node.type) {
                  case "trigger":
                    return "#10b981";
                  case "condition":
                    return "#3b82f6";
                  case "action":
                    return "#f59e0b";
                  case "delay":
                    return "#6b7280";
                  case "message":
                    return "#ec4899"; // Pink for message nodes
                  case "button":
                    return "#8b5cf6"; // Purple for button nodes
                  case "loop":
                    return "#14b8a6"; // Teal for loop nodes
                  case "randomizer":
                    return "#f43f5e"; // Red for randomizer nodes
                  default:
                    return "#e5e7eb";
                }
              }}
            />
            <Background gap={20} />
          </ReactFlow>
        </div>
      </div>

      <NodeConfigModal />

      <ConfirmationPopup
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Node"
        message={`Are you sure you want to delete this node? This will also delete ${affectedNodes.length} connected node${affectedNodes.length !== 1 ? "s" : ""} that depend on it.`}
      />
    </div>
  );
};

export default FlowBuilder;
