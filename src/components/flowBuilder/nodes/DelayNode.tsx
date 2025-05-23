
import { Handle, Position } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { openConfigModal } from "@/redux/slices/flowUI.slice";
import { Clock, Trash2 } from "lucide-react";

const DelayNode = ({
  data,
  id,
}: {
  id: string;
  data: {
    label: string;
    onDelete?: (id: string) => void;
  };
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  return (
    <div
      className="bg-gray-500 text-white p-4 rounded-lg border-2 border-gray-600 min-w-[150px] cursor-pointer hover:bg-gray-600 transition-colors group relative"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1 flex items-center">
        <Clock size={16} className="mr-1.5" />
        <span>Delay</span>
      </div>
      <div className="text-xs">{String(data?.label || "Delay Node")}</div>

      <div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          if (data?.onDelete) {
            data.onDelete(id);
          }
        }}
      >
        <Trash2 size={16} className="text-white hover:text-red-300" />
      </div>

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
