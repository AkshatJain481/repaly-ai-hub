import { FiMessageSquare } from "react-icons/fi";
import { AnalyticsReplyItem } from "@/utils/interfaces";

const InstagramMediaReplyAnalytics = ({
  totalReplies,
  replyItems,
}: {
  totalReplies: number;
  replyItems: AnalyticsReplyItem[];
}) => {
  return (
    <div className="w-full md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Automated Replies Overview
        </h2>
        <FiMessageSquare className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Total Automated Replies
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Comments automatically responded to
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {totalReplies}
          </p>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-600 mb-6" />

      <div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          Replies Breakdown
        </h3>
        <div className="flex flex-col gap-4">
          {replyItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex gap-3 items-center">
                <item.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramMediaReplyAnalytics;
