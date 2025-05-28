import { Handle, Position } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { openConfigModal } from "@/redux/slices/flowUI.slice";
import {
  MessageSquare,
  Image,
  MessageCircle,
  Film,
  FileText,
  Layout,
  Trash2,
} from "lucide-react";

const MessageNode = ({
  data,
  id,
}: {
  data: {
    config?: {
      messageType?: string;
      content?: string;
      buttons?: { text: string; id: string }[];
    };
    onDelete?: (id: string) => void;
  };
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  const messageTypeIcon = () => {
    const messageType = data?.config?.messageType || "text";
    switch (messageType) {
      case "image":
        return <Image size={16} className="mr-1.5" />;
      case "audio":
        return <MessageCircle size={16} className="mr-1.5" />;
      case "video":
        return <Film size={16} className="mr-1.5" />;
      case "card":
        return <FileText size={16} className="mr-1.5" />;
      case "gallery":
        return <Layout size={16} className="mr-1.5" />;
      case "text":
      default:
        return <MessageSquare size={16} className="mr-1.5" />;
    }
  };

  return (
    <div
      className="bg-pink-500 text-white p-4 rounded-lg border-2 border-pink-600 min-w-[170px] cursor-pointer hover:bg-pink-600 transition-colors group relative"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1 flex items-center">
        {messageTypeIcon()}
        <span>Message</span>
      </div>
      <div className="text-xs">{data?.config?.content || "Hello, world!"}</div>

      {data?.config?.messageType !== "text" && (
        <div className="mt-2 bg-pink-600 p-2 rounded-md text-xs">
          <span className="text-pink-300">Type: </span>
          {data?.config?.messageType || "text"}
        </div>
      )}

      {data?.config?.buttons && data?.config?.buttons.length > 0 && (
        <div className="mt-2 space-y-2">
          {data?.config?.buttons.map((button: any, index: number) => (
            <div
              key={index}
              className="bg-pink-600 p-2 rounded-md text-xs flex items-center justify-between relative"
            >
              <span>{button.text || `Button ${index + 1}`}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={button.id || `btn-${index}`}
                className="w-3 h-3 bg-white border-2 border-pink-500 absolute right-1 top-1/2 -translate-y-1/2"
              />
            </div>
          ))}
        </div>
      )}

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
        className="w-3 h-3 bg-white border-2 border-pink-500"
      />
      {!(data?.config?.buttons && data?.config?.buttons.length > 0) && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-pink-500"
        />
      )}
    </div>
  );
};

export default MessageNode;
