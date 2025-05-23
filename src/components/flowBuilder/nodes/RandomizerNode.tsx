
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { openConfigModal } from '@/redux/slices/flowUI.slice';
import { Shuffle } from 'lucide-react';

const RandomizerNode: React.FC<NodeProps> = ({ data, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div 
      className="bg-rose-500 text-white p-4 rounded-lg border-2 border-rose-600 min-w-[170px] cursor-pointer hover:bg-rose-600 transition-colors"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1 flex items-center">
        <Shuffle size={16} className="mr-1.5" />
        <span>Randomizer</span>
      </div>
      <div className="text-xs">{String(data?.label || 'Random Selection')}</div>
      
      <div className="mt-2 space-y-2">
        {data?.config?.options && data.config.options.map((option: any, index: number) => (
          <div key={index} className="bg-rose-600 p-2 rounded-md flex items-center justify-between text-xs">
            <span className="truncate max-w-[100px]">{option.label}</span>
            <span className="bg-rose-400 px-1.5 py-0.5 rounded-full text-white text-xs">
              {option.weight}%
            </span>
          </div>
        ))}
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-rose-500"
      />
      {data?.config?.options && data.config.options.map((_, index: number) => (
        <Handle
          key={index}
          id={`out-${index}`}
          type="source"
          position={Position.Bottom}
          style={{ left: `${(index + 1) * (100 / (data.config.options.length + 1))}%` }}
          className="w-3 h-3 bg-white border-2 border-rose-500"
        />
      ))}
    </div>
  );
};

export default RandomizerNode;
