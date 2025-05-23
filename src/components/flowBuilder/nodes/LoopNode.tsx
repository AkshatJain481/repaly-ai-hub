
import { Handle, Position } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { openConfigModal } from "@/redux/slices/flowUI.slice";
import { RefreshCcw, Trash2 } from "lucide-react";

const LoopNode = ({
  data,
  id,
}: {
  data: {
    label: string;
    config: {
      targetNodeId?: string;
      maxIterations?: number;
    };
    onDelete?: (id: string) => void;
  };
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div
      className="bg-teal-500 text-white p-4 rounded-lg border-2 border-teal-600 min-w-[160px] cursor-pointer hover:bg-teal-600 transition-colors group relative"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1 flex items-center">
        <RefreshCcw size={16} className="mr-1.5" />
        <span>Loop</span>
      </div>
      <div className="text-xs">{String(data?.label || "Loop Back")}</div>

      <div className="mt-2 bg-teal-600 p-2 rounded-md text-xs">
        <div>
          <span className="text-teal-300">Target:</span>{" "}
          {data?.config?.targetNodeId || "None selected"}
        </div>
        <div>
          <span className="text-teal-300">Max iterations:</span>{" "}
          {data?.config?.maxIterations || "Unlimited"}
        </div>
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
        className="w-3 h-3 bg-white border-2 border-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-teal-500"
      />
    </div>
  );
};

export default LoopNode;
