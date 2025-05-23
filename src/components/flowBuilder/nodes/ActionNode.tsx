
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { openConfigModal } from '@/redux/slices/flowUI.slice';

const ActionNode: React.FC<NodeProps> = ({ data, id }) => {
  const dispatch = useDispatch();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div 
      className="bg-orange-500 text-white p-4 rounded-lg border-2 border-orange-600 min-w-[150px] cursor-pointer hover:bg-orange-600 transition-colors"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1">Action</div>
      <div className="text-xs">{data.label}</div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-orange-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-orange-500"
      />
    </div>
  );
};

export default ActionNode;
