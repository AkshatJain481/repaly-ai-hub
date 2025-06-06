import { Handle, Position } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { openConfigModal } from "@/redux/slices/flowUI.slice";
import { Shuffle, Trash2 } from "lucide-react";

const RandomizerNode = ({
  data,
  id,
}: {
  data: {
    label: string;
    config: {
      options?: { weight: number; label: string }[];
      messageType?: string;
      content?: string;
      buttons?: { text: string }[];
    };
    onDelete?: (id: string) => void;
  };
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  // Type definition for option object
  interface Option {
    weight: number;
    label: string;
  }

  return (
    <div
      className="bg-rose-500 text-white p-4 rounded-lg border-2 border-rose-600 min-w-[170px] cursor-pointer hover:bg-rose-600 transition-colors group relative"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1 flex items-center">
        <Shuffle size={16} className="mr-1.5" />
        <span>Randomizer</span>
      </div>
      <div className="text-xs">{String(data?.label || "Random Selection")}</div>

      <div className="mt-2 space-y-2">
        {data?.config?.options?.map((option: Option, index: number) => (
          <div
            key={index}
            className="bg-rose-600 p-2 rounded-md flex items-center justify-between text-xs relative"
          >
            <span className="truncate max-w-[100px]">{option.label}</span>
            <span className="bg-rose-400 px-1.5 py-0.5 rounded-full text-white text-xs">
              {option.weight}%
            </span>

            {/* Individual handle positioned absolutely to the right center of this option */}
            <Handle
              key={index}
              id={`out-${index}`}
              type="source"
              position={Position.Right}
              className="w-3 h-3 bg-white border-2 border-rose-500 absolute right-[-8px] top-1/2 -translate-y-1/2"
            />
          </div>
        ))}

        {(!data?.config?.options || data.config.options.length === 0) && (
          <div className="bg-rose-600 p-2 rounded-md text-xs">
            No options configured
          </div>
        )}
      </div>

      <div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          if (data?.onDelete) data.onDelete(id);
        }}
      >
        <Trash2 size={16} className="text-white hover:text-red-300" />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-rose-500"
      />
      {(!data?.config?.options || data.config.options.length === 0) && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-rose-500"
        />
      )}
    </div>
  );
};

export default RandomizerNode;
