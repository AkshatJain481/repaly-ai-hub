import { Handle, Position } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { openConfigModal } from "@/redux/slices/flowUI.slice";
import { MousePointer } from "lucide-react";

const ButtonNode = ({
  data,
  id,
}: {
  data: {
    label: string;
    config: {
      actionType: string;
      text: string;
    };
  };
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  const getActionTypeLabel = (actionType: string) => {
    switch (actionType) {
      case "ai_response":
        return "AI Response";
      case "open_website":
        return "Open Website";
      case "perform_actions":
        return "Perform Actions";
      case "condition":
        return "Check Condition";
      case "randomizer":
        return "Random Selection";
      case "smart_delay":
        return "Smart Delay";
      case "start_flow":
        return "Start Another Flow";
      case "goto_step":
        return "Go to Step";
      default:
        return "Action";
    }
  };

  return (
    <div
      className="bg-purple-500 text-white p-4 rounded-lg border-2 border-purple-600 min-w-[170px] cursor-pointer hover:bg-purple-600 transition-colors"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1">Button</div>
      <div className="text-xs">{String(data?.label || "Button Node")}</div>

      <div className="mt-2 flex flex-col gap-2">
        <div className="bg-purple-600 rounded p-2 flex items-center text-xs">
          <MousePointer size={14} className="mr-1.5" />
          <span>{data?.config?.text || "Click me"}</span>
        </div>

        <div className="bg-purple-700 rounded p-2 text-xs">
          <span className="block text-purple-300 mb-1">When clicked:</span>
          <span>
            {getActionTypeLabel(data?.config?.actionType || "send_message")}
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-purple-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-purple-500"
      />
    </div>
  );
};

export default ButtonNode;
