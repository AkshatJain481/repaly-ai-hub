import { StoryCardProp } from "@/utils/interfaces";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AccountDropdown from "@/components/ui/AccountDropdown";
import { FiRefreshCw } from "react-icons/fi";
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
    return <Navigate to="/dashboard" />;
  }

  const renderMedia = () => {
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Instagram Stories
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Automate your Instagram stories with ease
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start md:items-end gap-3 w-full sm:w-auto">
            <Button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors"
            >
              <FiRefreshCw
                className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <AccountDropdown />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {isLoading ? (
            <Loading />
          ) : storyData.length === 0 ? (
            <div className="flex items-center justify-center h-[70vh]">
              <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400 text-center">
                No Stories Available
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-auto scrollbar-hidden">
              {storyData?.map((data: StoryCardProp) => (
                <StoryCard key={data.story_id} storyData={data} />
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="p-2 flex flex-col gap-6 dark:bg-black min-h-screen">
      {renderMedia()}
    </div>
  );
};

export default InstagramStoryPage;
