import { useGetStoryAnalyticsQuery } from "@/apis/instagram";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loading from "../common/Loading";
import { RefreshCw } from "lucide-react";
import TaggedComments from "./TaggedComments";
import { Button } from "./button";

const InstagramStoryAnalyticsTab = () => {
  const { storyDetails } = useSelector(
    (state: RootState) => state.storyAutomation
  );

  const {
    data: analyticsData,
    isFetching: isAnalyticsLoading,
    refetch: refetchAnalytics,
  } = useGetStoryAnalyticsQuery(storyDetails?.story_id || "", {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Button
        onClick={() => refetchAnalytics()}
        className="inline-flex items-center gap-2 px-4 py-2 max-w-[150px] text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors"
        aria-label="Refresh analytics"
      >
        <RefreshCw
          className={`w-5 h-5 ${isAnalyticsLoading ? "animate-spin" : ""}`}
        />
        Refresh
      </Button>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg">
        {isAnalyticsLoading ? (
          <Loading />
        ) : (
          <TaggedComments
            comments={analyticsData?.comments_by_type?.tagged || []}
          />
        )}
      </div>
    </div>
  );
};

export default InstagramStoryAnalyticsTab;
