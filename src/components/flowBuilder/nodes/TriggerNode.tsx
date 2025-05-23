
import { Handle, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openConfigModal } from "@/redux/slices/flowUI.slice";
import { Trash2, Zap } from "lucide-react";

const TriggerNode = ({
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
  const { currentFlow } = useSelector((state: RootState) => state.flow);

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  // Check if this is the first trigger node (which shouldn't be deletable)
  const isFirstTrigger =
    currentFlow.nodes.findIndex((node) => node.id === id) === 0;

  return (
    <div
      className="bg-green-500 text-white p-4 rounded-lg border-2 border-green-600 min-w-[150px] cursor-pointer hover:bg-green-600 transition-colors group relative"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1 flex items-center">
        <Zap size={16} className="mr-1.5" />
        <span>Trigger</span>
      </div>
      <div className="text-xs">{String(data?.label || "Trigger Node")}</div>

      {!isFirstTrigger && (
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
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-green-500"
      />
    </div>
  );
};

export default TriggerNode;
