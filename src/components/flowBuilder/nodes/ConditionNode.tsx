
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { openConfigModal } from '@/redux/slices/flowUI.slice';

const ConditionNode: React.FC<NodeProps> = ({ data, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div 
      className="bg-blue-500 text-white p-4 rounded-lg border-2 border-blue-600 min-w-[150px] cursor-pointer hover:bg-blue-600 transition-colors transform rotate-45"
      onClick={handleNodeClick}
    >
      <div className="transform -rotate-45">
        <div className="text-sm font-semibold mb-1">Condition</div>
        <div className="text-xs">{String(data?.label || 'Condition Node')}</div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="w-3 h-3 bg-white border-2 border-blue-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="no"
        className="w-3 h-3 bg-white border-2 border-blue-500"
      />
    </div>
  );
};

export default ConditionNode;
