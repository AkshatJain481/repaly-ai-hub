
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { openConfigModal } from '@/redux/slices/flowUI.slice';

const DelayNode: React.FC<NodeProps> = ({ data, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div 
      className="bg-gray-500 text-white p-4 rounded-lg border-2 border-gray-600 min-w-[150px] cursor-pointer hover:bg-gray-600 transition-colors"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1">Delay</div>
      <div className="text-xs">{String(data?.label || 'Delay Node')}</div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-gray-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-500"
      />
    </div>
  );
};

export default DelayNode;
