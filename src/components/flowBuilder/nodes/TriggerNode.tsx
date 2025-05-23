
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { openConfigModal } from '@/redux/slices/flowUI.slice';

const TriggerNode: React.FC<NodeProps> = ({ data, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div 
      className="bg-green-500 text-white p-4 rounded-lg border-2 border-green-600 min-w-[150px] cursor-pointer hover:bg-green-600 transition-colors"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1">Trigger</div>
      <div className="text-xs">{String(data?.label || 'Trigger Node')}</div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-green-500"
      />
    </div>
  );
};

export default TriggerNode;
