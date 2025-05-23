import { useCallback, useEffect, useState, useRef } from "react";
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
  NodeTypes,
  MarkerType,
  Panel,
  Edge,
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
import LoopNode from "./nodes/LoopNode";
import RandomizerNode from "./nodes/RandomizerNode";
import ConfirmationPopup from "../common/ConfirmationPopup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  delay: DelayNode,
  message: MessageNode,
  loop: LoopNode,
  randomizer: RandomizerNode,
};

const FlowBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentFlow } = useSelector((state: RootState) => state.flow);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [affectedNodes, setAffectedNodes] = useState<string[]>([]);
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [newNodePosition, setNewNodePosition] = useState({ x: 0, y: 0 });

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

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
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      type: edge.type,
      label: edge.label,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }));
    setEdges(flowEdges);
  }, [currentFlow.edges]);

  useEffect(() => {
    dispatch(loadFlows());
  }, [dispatch]);

  const onConnect = useCallback(
    (params: Connection) => {
      // If it's a button handle connection, update the params
      if (params.sourceHandle && params.sourceHandle.startsWith("btn-")) {
        // This is a connection from a button
        // Allow the connection to proceed
      }

      const edge = {
        id: `${params.source}-${params.target}${params.sourceHandle ? `-${params.sourceHandle}` : ""}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle || undefined,
        targetHandle: params.targetHandle || undefined,
        type: "default",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      dispatch(addFlowEdge(edge));
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      );
    },
    [dispatch, setEdges]
  );

  const onConnectStart = useCallback(() => {
    // When a user starts a connection, we don't need to do anything specific yet
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane && reactFlowWrapper.current) {
        // Get the position where the connection drag ended
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        setNewNodePosition({ x, y });
        setIsNodeSelectorOpen(true);
      }
    },
    [reactFlowWrapper]
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

  // Add new node from node selector
  const handleAddNode = (type: string) => {
    dispatch({
      type: "flow/addNode",
      payload: {
        type,
        position: newNodePosition,
      },
    });

    // Close the node selector
    setIsNodeSelectorOpen(false);
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <FlowBuilderSidebar />

      <div className="flex-1 flex flex-col">
        <FlowBuilderToolbar />

        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
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

            {/* Add Panel for help */}
            <Panel position="bottom-right">
              <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm">
                <p>Drag connections between nodes to create your flow</p>
                <p>Drag to empty space to add a new node</p>
              </div>
            </Panel>
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

      <Dialog open={isNodeSelectorOpen} onOpenChange={setIsNodeSelectorOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add a Node</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleAddNode("message")}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Message
            </Button>
            <Button
              onClick={() => handleAddNode("condition")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Condition
            </Button>
            <Button
              onClick={() => handleAddNode("action")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Action
            </Button>
            <Button
              onClick={() => handleAddNode("delay")}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Delay
            </Button>
            <Button
              onClick={() => handleAddNode("loop")}
              className="bg-teal-500 hover:bg-teal-600"
            >
              Loop
            </Button>
            <Button
              onClick={() => handleAddNode("randomizer")}
              className="bg-red-500 hover:bg-red-600"
            >
              Randomizer
            </Button>
            <Button
              onClick={() => handleAddNode("trigger")}
              className="bg-green-500 hover:bg-green-600"
            >
              Trigger
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlowBuilder;
