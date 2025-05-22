import { useMemo } from "react";
import MediaCardGrid from "@/components/common/MediaCardGrid";
import { MediaCardProp } from "@/utils/interfaces";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AccountDropdown from "@/components/ui/AccountDropdown";
import { FiRefreshCw } from "react-icons/fi";
import { useGetRecentMediaQuery } from "@/apis/instagram";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const InstagramMediaPage = () => {
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetRecentMediaQuery(activeAccount?.id || "", {
    skip: !activeAccount,
  });

  const mediaData = useMemo(() => {
    return [...data].sort(
      (a: MediaCardProp, b: MediaCardProp) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [data]);

  if (!activeAccount && !isLoading) {
    return <Navigate to={"/dashboard"} />;
  }

  const renderMedia = () => {
    return (
      <>
        {/* Header Section (Fixed) */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex flex-col gap-0">
            <h1 className="text-3xl font-bold">Instagram Posts</h1>
            <p className="text-gray-500 font-bold text-lg">
              Automate your Instagram posts with ease
            </p>
          </div>
          <div className="flex items-end flex-col sm:flex-row gap-4 w-full sm:w-auto">
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

        {/* Scrollable Grid Section */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mediaData?.map((data: MediaCardProp) => (
                <MediaCardGrid
                  key={data.id}
                  mediaData={data}
                  unattendedComments={0}
                />
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

export default InstagramMediaPage;
