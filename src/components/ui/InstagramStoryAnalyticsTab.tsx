
import { useGetStoryAnalyticsQuery } from "@/apis/instagram";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loading from "../common/Loading";
import { RefreshCw } from "lucide-react";
import TaggedComments from "./TaggedComments";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-6">
      <Button
        aria-label="Refresh"
        onClick={() => refetchAnalytics()}
        variant="outline"
        className="max-w-[150px]"
      >
        <RefreshCw
          className={`h-5 w-5 mr-2 ${isAnalyticsLoading ? "animate-spin" : ""}`}
        />
        Refresh
      </Button>
      <div className="rounded-md p-6 bg-white shadow-sm">
        <div className="bg-gray-50 rounded-md">
          {isAnalyticsLoading ? (
            <Loading />
          ) : (
            <TaggedComments
              comments={analyticsData?.comments_by_type?.tagged || []}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramStoryAnalyticsTab;
