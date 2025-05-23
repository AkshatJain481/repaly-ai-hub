
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { openConfigModal } from '@/redux/slices/flowUI.slice';
import { MessageSquare, Image, Music, Video, CreditCard, Images } from 'lucide-react';

const MessageNode: React.FC<NodeProps> = ({ data, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNodeClick = () => {
    dispatch(openConfigModal(id));
  };

  const messageTypeIcon = () => {
    switch (data?.config?.messageType) {
      case 'image':
        return <Image size={14} className="mr-1" />;
      case 'audio':
        return <Music size={14} className="mr-1" />;
      case 'video':
        return <Video size={14} className="mr-1" />;
      case 'card':
        return <CreditCard size={14} className="mr-1" />;
      case 'gallery':
        return <Images size={14} className="mr-1" />;
      default: // text
        return <MessageSquare size={14} className="mr-1" />;
    }
  };

  const renderPreview = () => {
    const content = data?.config?.content || 'Message content';
    const truncatedContent = content.length > 25 ? content.substring(0, 22) + '...' : content;
    
    return (
      <div className="flex items-center text-xs">
        {messageTypeIcon()}
        <span>{truncatedContent}</span>
      </div>
    );
  };

  return (
    <div 
      className="bg-pink-500 text-white p-4 rounded-lg border-2 border-pink-600 min-w-[180px] cursor-pointer hover:bg-pink-600 transition-colors"
      onClick={handleNodeClick}
    >
      <div className="text-sm font-semibold mb-1">Message</div>
      <div className="text-xs">{String(data?.label || 'Send Message')}</div>
      
      <div className="mt-2 bg-pink-600 p-2 rounded-md">
        {renderPreview()}
      </div>
      
      {data?.config?.buttons && data.config.buttons.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.config.buttons.slice(0, 2).map((button: any, index: number) => (
            <div key={index} className="bg-pink-400 text-xs px-2 py-0.5 rounded-full">
              {button.text}
            </div>
          ))}
          {data.config.buttons.length > 2 && (
            <div className="bg-pink-400 text-xs px-2 py-0.5 rounded-full">
              +{data.config.buttons.length - 2}
            </div>
          )}
        </div>
      )}
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-pink-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-pink-500"
      />
    </div>
  );
};

export default MessageNode;
