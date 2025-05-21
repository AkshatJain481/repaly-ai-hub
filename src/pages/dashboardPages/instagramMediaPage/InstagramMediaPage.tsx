
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
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex flex-col gap-0">
            <h1 className="text-3xl font-bold">
              Instagram Posts
            </h1>
            <p className="text-gray-500">
              Automate your Instagram posts with ease
            </p>
          </div>
          <div className="flex items-end flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="font-bold border-2 border-gray-300 bg-white"
            >
              <FiRefreshCw
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto hide-scrollbar">
            {mediaData
              ?.slice(0)
              .map((data: MediaCardProp) => (
                <MediaCardGrid
                  key={data.id}
                  mediaData={data}
                  unattendedComments={0}
                />
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

export default InstagramMediaPage;
