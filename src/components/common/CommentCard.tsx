import { BiMessageRoundedDetail, BiReply } from "react-icons/bi";

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
    <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="flex items-center mb-3">
        <BiMessageRoundedDetail className="text-purple-600 dark:text-purple-400 mr-3 h-6 w-6" />
        <p className="font-medium text-gray-900 dark:text-gray-100">
          @{username}
        </p>
        {timestamp && (
          <p className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {timestamp}
          </p>
        )}
      </div>

      <p className="mb-4 text-gray-800 dark:text-gray-200 text-sm">
        {question}
      </p>

      {isReplySent && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-3 border-l-4 border-l-purple-600 dark:border-l-purple-400">
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center">
              <BiReply className="text-purple-600 dark:text-purple-400 mr-2 h-4 w-4" />
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Reply sent
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {replyTimestamp}
            </p>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            {replyText}
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
