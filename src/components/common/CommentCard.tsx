
import { MessageCircle, Reply } from "lucide-react";

interface CommentCardProps {
  username?: string;
  timestamp?: string;
  question?: string;
  replyText?: string;
  isReplySent?: boolean;
  replyTimestamp?: string;
}

const CommentCard = ({
  username = "user311",
  timestamp = "",
  question = "Does this come in other colors?",
  replyText = "Thanks for your question! We'll get back to you shortly.",
  isReplySent = true,
  replyTimestamp = "Apr 19, 1:30 PM",
}: CommentCardProps) => {
  return (
    <div className="border border-solid rounded-md p-4 bg-white shadow-sm">
      <div className="flex items-center mb-2">
        <MessageCircle className="text-primary mr-4 h-6 w-6" />
        <p className="font-medium text-gray-700">
          @{username}
        </p>
        {timestamp && (
          <p className="ml-auto text-sm text-gray-500">
            {timestamp}
          </p>
        )}
      </div>

      <p className="mb-3 text-gray-800">
        {question}
      </p>

      {isReplySent && (
        <div className="rounded-md bg-gray-50 p-3 border-l-4 border-l-primary">
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center">
              <Reply className="text-primary mr-3 h-4 w-4" />
              <p className="text-sm text-primary">
                Reply sent
              </p>
            </div>
            <p className="text-xs text-gray-500">
              {replyTimestamp}
            </p>
          </div>

          <p className="text-gray-700">{replyText}</p>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
