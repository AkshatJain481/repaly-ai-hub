
import { StoryCardProp } from "@/utils/interfaces";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AccountDropdown from "@/components/ui/AccountDropdown";
import { RefreshCw } from "lucide-react";
import { useGetRecentStoriesQuery } from "@/apis/instagram";
import StoryCard from "@/components/instagramComponents/StoryCard";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const InstagramStoryPage = () => {
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const {
    data: storyData = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetRecentStoriesQuery(activeAccount?.id || "", {
    skip: !activeAccount?.id,
  });

  if (!activeAccount && !isLoading) {
    return <Navigate to={"/dashboard"} />;
  }

  const renderMedia = () => {
    return (
      <>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex flex-col gap-0">
            <h1 className="text-3xl font-bold">
              Instagram Stories
            </h1>
            <p className="text-gray-500">
              Automate your Instagram stories with ease
            </p>
          </div>
          <div className="flex items-end flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="font-bold border-2 border-gray-300 bg-white"
            >
              <RefreshCw
                className={`h-7 w-7 mr-2 ${isFetching ? "animate-spin" : ""}`}
                style={{
                  transition: "transform 0.7s ease-in-out",
                  height: "30px",
                  width: "30px",
                }}
              />
              Refresh
            </Button>
            <AccountDropdown />
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : storyData.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <p className="text-center mt-6 text-gray-500 text-4xl font-semibold">
              No Stories Available!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto hide-scrollbar">
            {storyData?.map((data: StoryCardProp) => (
              <StoryCard key={data.story_id} storyData={data} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-2 flex flex-col gap-6 h-[90vh] overflow-hidden hide-scrollbar">
      {renderMedia()}
    </div>
  );
};

export default InstagramStoryPage;
