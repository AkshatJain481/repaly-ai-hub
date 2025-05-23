
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RootState } from '@/redux/store';
import { updateNodePosition, addEdge as addFlowEdge, loadFlows } from '@/redux/slices/flow.slice';
import FlowBuilderSidebar from './FlowBuilderSidebar';
import FlowBuilderToolbar from './FlowBuilderToolbar';
import NodeConfigModal from './NodeConfigModal';
import TriggerNode from './nodes/TriggerNode';
import ConditionNode from './nodes/ConditionNode';
import ActionNode from './nodes/ActionNode';
import DelayNode from './nodes/DelayNode';

const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  delay: DelayNode,
};

const FlowBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { currentFlow } = useSelector((state: RootState) => state.flow);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync Redux state with React Flow state
  useEffect(() => {
    const flowNodes: Node[] = currentFlow.nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    }));
    setNodes(flowNodes);
  }, [currentFlow.nodes, setNodes]);

  useEffect(() => {
    const flowEdges: Edge[] = currentFlow.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      label: edge.label,
    }));
    setEdges(flowEdges);
  }, [currentFlow.edges, setEdges]);

  useEffect(() => {
    dispatch(loadFlows());
  }, [dispatch]);

  const onConnect = useCallback((params: Connection) => {
    const edge = {
      id: `${params.source}-${params.target}`,
      source: params.source!,
      target: params.target!,
      type: 'default',
    };
    dispatch(addFlowEdge(edge));
  }, [dispatch]);

  const onNodeDragStop = useCallback((event: any, node: Node) => {
    dispatch(updateNodePosition({ id: node.id, position: node.position }));
  }, [dispatch]);

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
          >
            <Controls className="bg-white dark:bg-gray-700" />
            <MiniMap 
              className="bg-white dark:bg-gray-700" 
              nodeColor={(node) => {
                switch (node.type) {
                  case 'trigger': return '#10b981';
                  case 'condition': return '#3b82f6';
                  case 'action': return '#f59e0b';
                  case 'delay': return '#6b7280';
                  default: return '#e5e7eb';
                }
              }}
            />
            <Background gap={20} />
          </ReactFlow>
        </div>
      </div>
      
      <NodeConfigModal />
    </div>
  );
};

export default FlowBuilder;
