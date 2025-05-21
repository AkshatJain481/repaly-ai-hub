
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
    <div className="w-full md:w-1/2 p-6 border-2 rounded-lg shadow-sm bg-white max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">
          Automated Replies Overview
        </h2>
        <FiMessageSquare className="w-6 h-6 text-gray-400" />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">
              Total Automated Replies
            </h3>
            <p className="text-gray-500">Comments automatically responded to</p>
          </div>
          <p className="text-3xl font-bold">
            {totalReplies}
          </p>
        </div>
      </div>

      <hr className="mb-6" />

      <div>
        <h3 className="text-lg font-medium mb-4">
          Replies Breakdown
        </h3>
        <div className="flex flex-col gap-6">
          {replyItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center"
            >
              <div className="flex gap-3 items-center">
                <item.icon className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-xl font-bold">
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
