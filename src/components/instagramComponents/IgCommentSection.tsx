import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMediaCommentsQuery } from "@/apis/instagram";
import CommentCard from "../common/CommentCard";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { CommentData } from "@/utils/interfaces";
import { primaryColor } from "@/utils/constants";

// Format UNIX timestamp (seconds) to "Apr 19, 1:25 PM"
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const IgCommentSection = () => {
  const [commentType, setCommentType] = useState<
    | "positive"
    | "negative"
    | "potential_buyers"
    | "tagged_comment"
    | "tagged_comment_dm"
    | "inquiry"
  >("positive");

  const { mediaDetails } = useSelector((state: RootState) => state.automation);

  const { data: rawData = [], isFetching } = useGetMediaCommentsQuery(
    {
      mediaId: mediaDetails?.id || "",
      type: commentType,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const commentsData: CommentData[] = rawData.map(
    ([commentTimestamp, username, comment, repliedComment, repliedTimestamp]: [
      number,
      string,
      string,
      string,
      number,
    ]) => ({
      commentTimestamp,
      username,
      comment,
      repliedComment,
      repliedTimestamp,
    })
  );

  const tabs = [
    "positive",
    "negative",
    "potential_buyers",
    "tagged_comment",
    "tagged_comment_dm",
    "inquiry",
  ] as const;

  return (
    <div className="w-full">
      <Tabs.Root
        value={commentType}
        onValueChange={(val) => setCommentType(val as typeof commentType)}
      >
        {/* Tabs Header */}
        <Tabs.List className="flex overflow-x-auto bg-gray-100 p-1 rounded-lg gap-2">
          {tabs.map((type) => (
            <Tabs.Trigger
              key={type}
              value={type}
              className={`min-w-[150px] px-4 py-2 text-sm font-medium text-center rounded-lg flex-shrink-0 transition-all duration-150 ${
                commentType === type
                  ? "bg-[var(--primaryColor)] text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {type
                .split("_")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ")}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tabs Content */}
        <Tabs.Content value={commentType} className="mt-6">
          {isFetching ? (
            <div className="flex items-center justify-center h-[30vh]">
              <ClimbingBoxLoader size={16} color={primaryColor} />
            </div>
          ) : commentsData.length === 0 ? (
            <div className="flex items-center justify-center h-[30vh]">
              <p className="text-lg font-bold text-gray-500 text-center">
                No data available
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {commentsData.map((comment, idx) => (
                <CommentCard
                  key={idx}
                  username={comment.username}
                  timestamp={formatTimestamp(comment.commentTimestamp)}
                  question={comment.comment}
                  replyText={comment.repliedComment}
                  isReplySent={true}
                  replyTimestamp={formatTimestamp(comment.repliedTimestamp)}
                />
              ))}
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default IgCommentSection;
